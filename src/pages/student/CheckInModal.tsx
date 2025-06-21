import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import { Email } from "@mui/icons-material";
import { useState, useEffect } from "react";

interface CheckInModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: { email: string; date: string; time: string }) => void;
  email: string;
}

// ✅ Format date as yyyy-MM-dd using local time
const formatDateInput = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// ✅ Format time as HH:mm using local time
const formatTimeInput = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default function CheckInModal({
  open,
  onClose,
  onConfirm,
  email,
}: CheckInModalProps) {
  const [formData, setFormData] = useState({
    email: email,
    date: formatDateInput(new Date()),
    time: formatTimeInput(new Date()),
  });

  useEffect(() => {
    if (open) {
      setFormData({
        email,
        date: formatDateInput(new Date()),
        time: formatTimeInput(new Date()),
      });
    }
  }, [open, email]);

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData({ ...formData, [field]: e.target.value });

  const handleConfirm = () => {
    onConfirm(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Typography variant="h6" align="center" fontWeight="bold">
          Student Check-In
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={3} mt={1}>
          <TextField
            label="Email"
            fullWidth
            value={formData.email}
            onChange={handleChange("email")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email fontSize="small" sx={{ color: "gray" }} />
                </InputAdornment>
              ),
            }}
            disabled
          />

          <TextField
            label="Date"
            type="date"
            fullWidth
            value={formData.date}
            onChange={handleChange("date")}
            InputLabelProps={{ shrink: true }}
            disabled
          />

          <TextField
            label="Time"
            type="time"
            fullWidth
            value={formData.time}
            onChange={handleChange("time")}
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ textTransform: "none", width: 120 }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleConfirm}
          sx={{
            textTransform: "none",
            width: 120,
            backgroundColor: "#414545",
            "&:hover": { backgroundColor: "#333a3a" },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
