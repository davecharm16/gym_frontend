import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  Avatar,
  TextField,
  IconButton,
  MenuItem
} from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { useTrainingStore } from "../../../store/trainings/trainings"
import { useSubscriptionStore } from "../../../store/subscriptions/subscriptionsStore";
import MultiSelectCheckbox from "../../../components/common/MultiSelect";


export type StudentData = {
  first_name: string;
  middle_name?: string;
  last_name: string;
  address: string;
  age: number;
  birthdate: string;
  training_category: { training: { id: string; title: string; description: string; }; }[];
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

  const trainingOptions = trainings.map((t) => t.title);
  const subscriptionOptions = subscriptions.map((s) => s.name);

  React.useEffect(() => {
    setFormData(student);
  
    if (open) {
      useTrainingStore.getState().fetchTrainings();
      useSubscriptionStore.getState().getSubscriptionTypes();
    }
  }, [student, open]);

  React.useEffect(() => {
    setFormData(student);
  }, [student]);

  const handleChange = (field: keyof StudentData, value: string) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleToggleEdit = () => {
    setEditable((prev) => !prev);
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
      bgcolor: "background.paper",
      borderRadius: 3,
      p: 4,
      pt: 7, // add padding top to avoid overlap with close icon
      boxShadow: 24,
    }}
  >
    {/* Close Icon */}
    <IconButton
      onClick={onClose}
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        color: "grey.600",
        "&:hover": { color: "grey.800" },
      }}
    >
      <CloseIcon />
    </IconButton>

        
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
  {/* Left section: Avatar + Info */}
  <Stack direction="row" spacing={3} alignItems="center">

    
    <Avatar sx={{ width: 82, height: 82 }}>
      {student
        ? student.first_name[0] + (student.last_name?.[0] ?? "")
        : "?"}
    </Avatar>
    <div>
      <Typography variant="h5" fontWeight={700} lineHeight={1.2}>
        {formData
          ? `${formData.first_name} ${formData.middle_name ?? ""} ${formData.last_name}`
          : "No data"}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Profile details
      </Typography>
    </div>
  </Stack>

  {/* Right section: Edit/Save Button */}
  <IconButton onClick={handleToggleEdit}>
    {editable ? <SaveIcon /> : <EditIcon />}
  </IconButton>
</Stack>


        {formData ? (
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            }}
          >
            <FieldRow
              label="First Name"
              value={formData.first_name}
              onChange={(val) => handleChange("first_name", val)}
              editable={editable}
            />
            <FieldRow
              label="Middle Name"
              value={formData.middle_name ?? ""}
              onChange={(val) => handleChange("middle_name", val)}
              editable={editable}
            />
            <FieldRow
              label="Last Name"
              value={formData.last_name}
              onChange={(val) => handleChange("last_name", val)}
              editable={editable}
            />
            <FieldRow
              label="Birthdate"
              type="date"
              value={formData.birthdate}
              onChange={(val) => handleChange("birthdate", val)}
              editable={editable}
            />
            <FieldRow
              label="Address"
              value={formData.address}
              onChange={(val) => handleChange("address", val)}
              editable={editable}
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
              select
              options={subscriptionOptions}
            />

          
            <FieldRow
              label="Due Date"
              type="date"
              value={formData.due_date}
              onChange={(val) => handleChange("due_date", val)}
              editable={editable}
            />
          </Box>
        ) : (
          <Typography>No student data available.</Typography>
        )}

        {formData?.due_date && (
          <Box
            sx={{
              mt: 4,
              p: 2,
              borderRadius: 2,
              bgcolor: "primary.light",
              display: "flex",
              gap: 1.5,
              alignItems: "flex-start",
            }}
          >
            <InfoOutlined sx={{ mt: "2px" }} fontSize="small" />
            <Typography variant="body2" color="primary.dark">
              <strong>Note:</strong> Subscription is due on&nbsp;
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
};

const FieldRow: React.FC<FieldProps> = ({ label, value, onChange, editable, sx, type = "text", select = false, options = [] }) => (
  <TextField
    label={label}
    value={value}
    variant="outlined"
    size="small"
    fullWidth
    disabled={!editable}
    onChange={(e) => onChange?.(e.target.value)}
    sx={sx}
    type={type}
    select={select}
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
