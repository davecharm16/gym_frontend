import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerStudentSchema,  } from "../../../utils/schema/registerStudentSchema";
import type { RegisterStudentFormSchema } from "../../../utils/schema/registerStudentSchema";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useStudentStore } from "../../../store/student/studentStore";
import { useSubscriptionStore } from "../../../store/subscriptions/subscriptionsStore";

export type RegisterModalProps = {
  open: boolean;
  onClose: () => void;
};

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }) => {
  const registerStudent = useStudentStore((state) => state.registerStudent);
  const subscriptions = useSubscriptionStore((state) => state.subscriptions);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, },
  } = useForm<RegisterStudentFormSchema>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(registerStudentSchema as any),
  });

  const onSubmit = async (data: RegisterStudentFormSchema) => {
    try {
      await registerStudent(data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
    onClose();
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
            />
            <TextField
              fullWidth
              label="First Name"
              {...register("first_name")}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />
            <TextField
              fullWidth
              label="Middle Name (Optional)"
              {...register("middle_name")}
              error={!!errors.middle_name}
              helperText={errors.middle_name?.message}
            />
            <TextField
              select
              fullWidth
              label="Gender"
              {...register("sex")}
              error={!!errors.sex}
              helperText={errors.sex?.message}
              onChange={(e) => {
                // Ensure the value is set correctly
                const value = e.target.value; 
                console.log("Selected", value);
                setValue('sex', value)
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
            />
            <TextField
              fullWidth
              label="Birth Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register("birthdate")}
              error={!!errors.birthdate}
              helperText={errors.birthdate?.message}
            />
            <TextField
              fullWidth
              label="Enrollment Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register("enrollment_date")}
              error={!!errors.enrollment_date}
              helperText={errors.enrollment_date?.message}
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
            onChange={(e) => {
              const value = e.target.value;
              console.log("Selected Subscription ID:", value);
              setValue("subscription_type_id", value);
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
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              InputLabelProps={{ shrink: true }}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Stack>

          <Box
            sx={{
              border: "3px dashed #ccc",
              padding: 2,
              textAlign: "center",
              borderRadius: 2,
              mb: 3,
            }}
          >
            <input
              type="file"
              accept="image/*"
              // {...register("avatar")}
              style={{ display: "none" }}
              id="upload-avatar"
            />
            <label
              htmlFor="upload-avatar"
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <CloudUploadIcon color="action" fontSize="large" />
            </label>
          </Box>

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
              sx={{
                backgroundColor: "#414545",
                color: "white",
                textTransform: "none",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              Register
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
