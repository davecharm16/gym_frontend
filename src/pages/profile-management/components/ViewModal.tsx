import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  Avatar,
  TextField,
  IconButton,
  MenuItem,
  Divider,
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

export type StudentData = {
  id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  address: string;
  age: number;
  birthdate: string;
  training_category: {
    training: { id: string; title: string; description: string };
  }[];
  subscription_type_name: string;
  due_date: string;
};

type ViewModalProps = {
  open: boolean;
  onClose: () => void;
  student: StudentData | null;
};

const ViewModal: React.FC<ViewModalProps> = ({ open, onClose, student }) => {
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState<StudentData | null>(student);

  const { trainings } = useTrainingStore();
  const { subscriptions } = useSubscriptionStore();
  const { updateStudent } = useStudentStore(); // ✅ grab the zustand update fn

  const trainingOptions = trainings.map((t) => t.title);
  const subscriptionOptions = subscriptions.map((s) => s.name);

  React.useEffect(() => {
    setFormData(student);

    if (open) {
      useTrainingStore.getState().fetchTrainings();
      useSubscriptionStore.getState().getSubscriptionTypes();
    }
  }, [student, open]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: keyof StudentData, value: string) => {
    if (formData) setFormData({ ...formData, [field]: value });
  };

  const handleToggleEdit = async () => {
    if (editable) {
      const isValid = validateForm();
      if (!isValid) return;

      try {
        if (formData) {
          await updateStudent(formData.id, formData as any); // Cast safely if needed
          onClose(); // Close modal after update
        }
      } catch (err) {
        console.error("Update failed", err);
      }
    }
    setEditable((prev) => !prev);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData?.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData?.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData?.birthdate) newErrors.birthdate = "Birthdate is required";
    if (!formData?.address.trim()) newErrors.address = "Address is required";
    if (!formData?.subscription_type_name.trim())
      newErrors.subscription_type_name = "Subscription type is required";
    if (!formData?.due_date) newErrors.due_date = "Due date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "95%",
          maxWidth: 900,
          bgcolor: "#fff",
          borderRadius: 3,
          p: 4,
          pt: 7,
          boxShadow: 24,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "grey.600",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 72, height: 72, fontSize: 28 }}>
              {student
                ? student.first_name[0] + (student.last_name?.[0] ?? "")
                : "?"}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {formData
                  ? `${formData.first_name} ${formData.middle_name ?? ""} ${
                      formData.last_name
                    }`
                  : "No data"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Student Profile
              </Typography>
            </Box>
          </Stack>

          <Tooltip title={editable ? "Save" : "Edit"}>
            <IconButton
              onClick={handleToggleEdit}
              sx={{
                bgcolor: editable ? "#3c3d37" : "grey.200",
                color: editable ? "#fff" : "#3c3d37",
                "&:hover": {
                  bgcolor: editable ? "#2f2f2f" : "grey.300",
                },
              }}
            >
              {editable ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </Tooltip>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {formData ? (
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)" }}
            gap={2}
          >
            <FieldRow
              label="First Name"
              value={formData.first_name}
              onChange={(val) => handleChange("first_name", val)}
              editable={editable}
              error={!!errors.first_name}
              helperText={errors.first_name}
            />

            <FieldRow
              label="Middle Name"
              value={formData.middle_name ?? ""}
              onChange={(val) => handleChange("middle_name", val)}
              editable={editable}
              error={!!errors.middle_name}
              helperText={errors.middle_name}
            />
            <FieldRow
              label="Last Name"
              value={formData.last_name}
              onChange={(val) => handleChange("last_name", val)}
              editable={editable}
              error={!!errors.last_name}
              helperText={errors.last_name}
            />
            <FieldRow
              label="Birthdate"
              type="date"
              value={formData.birthdate}
              onChange={(val) => handleChange("birthdate", val)}
              editable={editable}
              error={!!errors.birthdate}
              helperText={errors.birthdate}
            />
            <FieldRow
              label="Address"
              value={formData.address}
              onChange={(val) => handleChange("address", val)}
              editable={editable}
              error={!!errors.address}
              helperText={errors.address}
              sx={{ gridColumn: { sm: "span 2" } }}
            />
            {/* <FieldRow
              label="Training Category"
              value={formData.training_category}
              onChange={(val) => handleChange("training_category", val)}
              editable={editable}
              select
              options={trainingOptions}
            /> */}
            <MultiSelectCheckbox
              options={trainingOptions}
              value={formData.training_category.map((t) => t.training.title)}
              onChange={(selectedTitles) => {
                const matchedTrainings = trainings
                  .filter((t) => selectedTitles.includes(t.title))
                  .map((t) => ({ training: t }));
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                handleChange("training_category", matchedTrainings as any);
              }}
              placeholder="Select training"
              disabled={!editable}
            />
            <FieldRow
              label="Subscription Type"
              value={formData.subscription_type_name}
              onChange={(val) => handleChange("subscription_type_name", val)}
              editable={editable}
              error={!!errors.subscription_type_name}
              helperText={errors.subscription_type_name}
              select
              options={subscriptionOptions}
            />
            <FieldRow
              label="Due Date"
              type="date"
              value={formData.due_date}
              onChange={(val) => handleChange("due_date", val)}
              editable={editable}
              error={!!errors.due_date}
              helperText={errors.due_date}
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
              alignItems: "flex-start",
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
      </Box>
    </Modal>
  );
};

type FieldProps = {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  editable: boolean;
  sx?: object;
  type?: string;
  select?: boolean;
  options?: string[];
  error?: boolean;
  helperText?: string;
};

const FieldRow: React.FC<FieldProps> = ({
  label,
  value,
  onChange,
  editable,
  sx,
  type = "text",
  select = false,
  options = [],
  error = false,
  helperText = "",
}) => (
  <TextField
    label={label}
    value={value}
    variant="outlined"
    size="small"
    fullWidth
    disabled={!editable}
    onChange={(e) => onChange?.(e.target.value)}
    sx={{ ...sx, backgroundColor: editable ? "#fafafa" : "#f9f9f9" }}
    type={type}
    select={select}
    error={error}
    helperText={helperText}
  >
    {select &&
      options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
  </TextField>
);

export default ViewModal;
