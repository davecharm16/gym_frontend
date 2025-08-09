import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerStudentSchema } from "../../../utils/schema/registerStudentSchema";
import type { RegisterStudentFormSchema } from "../../../utils/schema/registerStudentSchema";

import { useStudentStore } from "../../../store/student/studentStore";
import { useSubscriptionStore } from "../../../store/subscriptions/subscriptionsStore";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import UploadProfile from "./UploadProfile";
import { uploadProfileImage } from "@/api/student/students";

export type RegisterModalProps = {
  open: boolean;
  onClose: () => void;
};

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }) => {
  const registerStudent = useStudentStore((state) => state.registerStudent);
  const subscriptions = useSubscriptionStore((state) => state.subscriptions);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterStudentFormSchema>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(registerStudentSchema as any),
  });

  const onSubmit = async (data: RegisterStudentFormSchema) => {
    if (!selectedFile) {
      toast.error("Profile image is required.");
      return;
    }
  
    setIsSubmitting(true);
    try {

      // 2) Upload the profile image
      const resuplaod = await uploadProfileImage(undefined, selectedFile);
      console.log(resuplaod.imageUrl);
      data.picture_url = resuplaod.imageUrl;
      
      const res = await registerStudent(data);
  
      // We expect `res.data.id` to contain the student ID
      if (!res?.data?.id) {
        throw new Error("No student ID returned from registration.");
      }
  
      toast.success("Registration successful!");
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. " + error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Fetch subscriptions when the modal opens
    if (open) {
      useSubscriptionStore.getState().getSubscriptionTypes();
    }
  }, [open]);

  useEffect(() => {
    console.log("Available subscriptions:", subscriptions);
  }, [subscriptions]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "95%",
          maxWidth: 900,
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Membership Registration
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack direction="row" spacing={2} mb={2}>
            <TextField
              fullWidth
              label="Last Name"
              {...register("last_name")}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
              sx={{
                "& .MuiInputBase-input, & .MuiFormHelperText-root, & .MuiInputLabel-root":
                  { fontSize: 12 },
              }}
            />
            <TextField
              fullWidth
              label="First Name"
              {...register("first_name")}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
              sx={{
                "& .MuiInputBase-input, & .MuiFormHelperText-root, & .MuiInputLabel-root":
                  { fontSize: 12 },
              }}
            />
            <TextField
              fullWidth
              label="Middle Name"
              {...register("middle_name")}
              error={!!errors.middle_name}
              helperText={errors.middle_name?.message}
              sx={{
                "& .MuiInputBase-input, & .MuiFormHelperText-root, & .MuiInputLabel-root":
                  { fontSize: 12 },
              }}
            />
            <TextField
              select
              fullWidth
              label="Gender"
              {...register("sex")}
              error={!!errors.sex}
              helperText={errors.sex?.message}
              onChange={(e) => setValue("sex", e.target.value)}
              sx={{
                "& .MuiInputBase-input, & .MuiFormHelperText-root, & .MuiInputLabel-root":
                  { fontSize: 12 },
              }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          </Stack>

          <Stack direction="row" spacing={2} mb={2}>
            <TextField
              fullWidth
              label="Address"
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
              sx={{
                "& .MuiInputBase-input, & .MuiFormHelperText-root, & .MuiInputLabel-root":
                  { fontSize: 12 },
              }}
            />
            <TextField
              fullWidth
              label="Birth Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register("birthdate")}
              error={!!errors.birthdate}
              helperText={errors.birthdate?.message}
              sx={{
                "& .MuiInputBase-input, & .MuiFormHelperText-root, & .MuiInputLabel-root":
                  { fontSize: 12 },
              }}
            />
            <TextField
              fullWidth
              label="Enrollment Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register("enrollment_date")}
              error={!!errors.enrollment_date}
              helperText={errors.enrollment_date?.message}
              sx={{
                "& .MuiInputBase-input, & .MuiFormHelperText-root, & .MuiInputLabel-root":
                  { fontSize: 12 },
              }}
            />
          </Stack>

          <Stack direction="row" spacing={2} mb={2}>
            <TextField
              select
              fullWidth
              label="Subscription Type"
              {...register("subscription_type_id")}
              error={!!errors.subscription_type_id}
              helperText={errors.subscription_type_id?.message}
              onChange={(e) => setValue("subscription_type_id", e.target.value)}
              sx={{
                "& .MuiInputBase-input, & .MuiFormHelperText-root, & .MuiInputLabel-root":
                  { fontSize: 12 },
              }}
            >
              {subscriptions.map((sub) => (
                <MenuItem key={sub.id} value={sub.id}>
                  {sub.name} - ₱{sub.amount ?? "N/A"}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& .MuiInputBase-input, & .MuiFormHelperText-root, & .MuiInputLabel-root":
                  { fontSize: 12 },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
              InputLabelProps={{ shrink: true }}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                "& .MuiInputBase-input, & .MuiFormHelperText-root, & .MuiInputLabel-root":
                  {
                    fontSize: 12,
                  },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack>
            <UploadProfile
              editable={true}
              onFileSelected={(file) => setSelectedFile(file)}
            />
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                color: "black",
                borderColor: "black",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#333",
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                backgroundColor: "#414545",
                color: "white",
                textTransform: "none",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
