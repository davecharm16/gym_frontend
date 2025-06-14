import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { Email } from "@mui/icons-material";
import { useState, useEffect } from "react";

interface CheckInModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: { email: string; date: string; time: string }) => void;
  email: string;
}

export default function CheckInModal({
  open,
  onClose,
  onConfirm,
  email,
}: CheckInModalProps) {

  const [formData, setFormData] = useState({
    email: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (open) {
      setFormData({ email, date: "", time: "" });
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
      <DialogTitle className="text-center text-2xl font-semibold">
        Check in
      </DialogTitle>

      <DialogContent className="flex flex-col gap-6 mt-2">
        <TextField
          label="Email"
          placeholder="Enter Email"
          fullWidth
          value={formData.email}
          onChange={handleChange("email")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email fontSize="small" className="text-gray-500" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Date"
          type="date"
          placeholder="MM/DD/YYYY"
          fullWidth
          value={formData.date}
          onChange={handleChange("date")}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Time"
          type="time"
          placeholder="HH:MM"
          fullWidth
          value={formData.time}
          onChange={handleChange("time")}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>

      <DialogActions
        className="flex flex-row gap-x-4 py-4 px-6"
        sx={{ justifyContent: "center" }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ textTransform: "none", width: "150px" }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleConfirm}
          sx={{
            width: "150px",
            backgroundColor: "#414545",
            textTransform: "none",
            "&:hover": { backgroundColor: "#333a3a" },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
