import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  TextField,
  IconButton,
  MenuItem,
  Tooltip,
} from "@mui/material";

import InfoOutlined from "@mui/icons-material/InfoOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { useTrainingStore } from "../../../store/trainings/trainings";
import { useSubscriptionStore } from "../../../store/subscriptions/subscriptionsStore";
import MultiSelectCheckbox from "../../../components/common/MultiSelect";
import { useStudentStore } from "../../../store/student/studentStore";
import PasswordManagement from "./PasswordReset";
import UploadProfile from "./UploadProfile";
import { uploadProfileImage } from "@/api/student/students";
import { toast } from "sonner";

export type StudentData = {
  id: string;
  user_id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  address: string;
  age: number;
  picture_url: string;
  email: string;
  birthdate: string;
  training_category: {
    training: { id: string; title: string; description: string };
  }[];
  subscription_type_name: string;
  due_date: string;
  subscription_type_id: string | null;
};

type ViewModalProps = {
  open: boolean;
  onClose: () => void;
  student: StudentData | null;
};

const ViewModal: React.FC<ViewModalProps> = ({ open, onClose, student }) => {
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState<StudentData | null>(student);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { trainings, fetchTrainings } = useTrainingStore();
  const { subscriptions, getSubscriptionTypes } = useSubscriptionStore();
  const { updateStudent } = useStudentStore();
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
    string | null
  >(null);

  const trainingOptions = trainings.map((t) => t.title);
  const subscriptionOptions = subscriptions.map((s) => s.name);

  useEffect(() => {
    console.error(student?.picture_url);
    setFormData(student);

    if (student && subscriptions.length) {
      // Find subscription matching the student subscription name
      const match = subscriptions.find(
        (s) => s.name === student.subscription_type_name
      );
      setSelectedSubscriptionId(match?.id ?? null);
    }

    if (open) {
      fetchTrainings();
      getSubscriptionTypes();
    }
  }, [student, open, fetchTrainings, getSubscriptionTypes, subscriptions]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: keyof StudentData, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const validateForm = () => {
    if (!formData) return false;
    const newErrors: Record<string, string> = {};
    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData.birthdate) newErrors.birthdate = "Birthdate is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.subscription_type_name.trim())
      newErrors.subscription_type_name = "Subscription type is required";
    if (!formData.due_date) newErrors.due_date = "Due date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleToggleEdit = async () => {
    if (selectedFile) {
      try {
        await uploadProfileImage(student?.id ?? "", selectedFile);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Update failed", err);
        toast.error("Failed to update user.");
        return;
      }
    }
    if (editable && formData) {
      try {
        if (!validateForm()) return;
        const trainingsPayload = formData.training_category.map((tc) => ({
          training_id: tc.training.id,
          subscription_type_id: selectedSubscriptionId,
        }));
        const { ...studentForm } = formData;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await updateStudent(formData.id, studentForm as any, trainingsPayload);
        toast.success("successfully updated.");
        onClose();
      } catch (err) {
        console.error("Update failed", err);
        toast.error("Failed to update user");
      }
    }
    setEditable((prev) => !prev);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "54%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "95%",
          maxWidth: 900,
          bgcolor: "background.paper",
          borderRadius: 3,
          p: 4,
          pt: 7,
          boxShadow: 24,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 16, right: 16 }}
        >
          <CloseIcon />
        </IconButton>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Stack direction="row" spacing={3} alignItems="center">
            <Box sx={{ width: 150 }}>
              <UploadProfile
                editable={editable}
                defaultImage={formData?.picture_url}
                onFileSelected={(file) => setSelectedFile(file)}
              />
            </Box>

            <Box sx={{ width: 350 }}>
              <Typography variant="h5" fontWeight={700} noWrap>
                {formData
                  ? `${formData.first_name} ${formData.middle_name ?? ""} ${
                      formData.last_name
                    }`
                  : "No data"}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                Student Profile
              </Typography>
            </Box>
          </Stack>

          <Tooltip title={editable ? "Save" : "Edit"}>
            <IconButton
              onClick={handleToggleEdit}
              sx={{
                bgcolor: editable ? "primary.main" : "grey.200",
                color: editable ? "common.white" : "text.primary",
                "&:hover": { bgcolor: editable ? "primary.dark" : "grey.300" },
              }}
            >
              {editable ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </Tooltip>
        </Stack>

        {formData ? (
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)" }}
            gap={2}
          >
            <TextField
              label="First Name"
              value={formData.first_name}
              onChange={(e) => handleChange("first_name", e.target.value)}
              disabled={!editable}
              error={!!errors.first_name}
              helperText={errors.first_name}
              size="small"
            />
            <TextField
              label="Middle Name"
              value={formData.middle_name || ""}
              onChange={(e) => handleChange("middle_name", e.target.value)}
              disabled={!editable}
              size="small"
            />
            <TextField
              label="Last Name"
              value={formData.last_name}
              onChange={(e) => handleChange("last_name", e.target.value)}
              disabled={!editable}
              error={!!errors.last_name}
              helperText={errors.last_name}
              size="small"
            />
            <TextField
              type="date"
              label="Birthdate"
              value={formData.birthdate}
              onChange={(e) => handleChange("birthdate", e.target.value)}
              disabled={!editable}
              error={!!errors.birthdate}
              helperText={errors.birthdate}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              disabled={!editable}
              error={!!errors.address}
              helperText={errors.address}
              size="small"
              sx={{ gridColumn: { sm: "span 2" } }}
            />
            <MultiSelectCheckbox
              options={trainingOptions}
              value={formData.training_category.map((tc) => tc.training.title)}
              onChange={(selected) => {
                const mapped = trainings
                  .filter((t) => selected.includes(t.title))
                  .map((t) => ({ training: t }));
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                handleChange("training_category", mapped as any);
              }}
              placeholder="Select training"
              disabled={!editable}
            />
            <TextField
              select
              label="Subscription Type"
              value={formData.subscription_type_name}
              onChange={(e) => {
                const selectedName = e.target.value;
                handleChange("subscription_type_name", selectedName);
                // Find and set the subscription id
                const found = subscriptions.find(
                  (s) => s.name === selectedName
                );
                setSelectedSubscriptionId(found?.id ?? null);
              }}
              disabled={!editable}
              size="small"
            >
              {subscriptionOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              type="date"
              label="Due Date"
              value={formData.due_date}
              onChange={(e) => handleChange("due_date", e.target.value)}
              disabled={!editable}
              error={!!errors.due_date}
              helperText={errors.due_date}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        ) : (
          <Typography color="text.secondary">
            No student data available.
          </Typography>
        )}

        {formData?.due_date && (
          <Box
            sx={{
              mt: 4,
              p: 2,
              borderRadius: 1,
              bgcolor: "#E3F2FD",
              display: "flex",
              gap: 1.5,
            }}
          >
            <InfoOutlined
              sx={{ mt: "2px", color: "primary.main" }}
              fontSize="small"
            />
            <Typography variant="body2" color="text.primary">
              <strong>Note:</strong> Subscription is due on{" "}
              {new Date(formData.due_date).toLocaleDateString()}.
            </Typography>
          </Box>
        )}
        <PasswordManagement
          email={student?.email ?? ""}
          userId={student?.user_id ?? ""}
        />
      </Box>
    </Modal>
  );
};

export default ViewModal;
