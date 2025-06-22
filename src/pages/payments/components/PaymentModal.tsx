import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  Checkbox,
  ListItemText,
  Select,
  OutlinedInput,
} from "@mui/material";

export type PaymentModalProps = {
  open: boolean;
  onClose: () => void;
};

const TRAINING_OPTIONS = ["Weight Training", "Crossfit", "Boxing"];

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onClose }) => {
  const [form, setForm] = React.useState({
    memberName: "",
    trainingCategory: [] as string[],
    amount: "",
    paymentDate: "",
    subscription: "",
    paymentMethod: "",
  });

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const handleSave = () => {
    console.log("Payment saved:", form);
    onClose();
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
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", marginBottom:"18px", }}>
          Add Payment
        </Typography>

        <Stack spacing={2} component="form" noValidate sx={{ mb: 3 }}>

         
          {/* Row 1 */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Member Name"
              fullWidth
              value={form.memberName}
              onChange={handleChange("memberName")}
            />

            <Select
              multiple
              displayEmpty
              fullWidth
              value={form.trainingCategory}
              input={<OutlinedInput />}
              renderValue={(selected) =>
                (selected as string[]).length === 0
                  ? "Select Training Category"
                  : (selected as string[]).join(", ")
              }
            >
              {TRAINING_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={form.trainingCategory.includes(option)} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </Stack>

          {/* Row 2 */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              value={form.amount}
              onChange={handleChange("amount")}
            />
            <TextField
              label="Payment Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={form.paymentDate}
              onChange={handleChange("paymentDate")}
            />
          </Stack>

          {/* Row 3 */}
          <Stack direction={{ xs: "column", sm: "row",}} spacing={2}>
            <TextField
              select
              label="Subscription"
              fullWidth
              value={form.subscription}
              onChange={handleChange("subscription")}
            >
              <MenuItem value="monthly">Monthly Subscription</MenuItem>
              <MenuItem value="session">Session Subscription</MenuItem>
            </TextField>

            <TextField
              select
              label="Payment Method"
              fullWidth
              value={form.paymentMethod}
              onChange={handleChange("paymentMethod")}
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="gcash">Gcash</MenuItem>
            </TextField>
          </Stack>

          

        </Stack>
        
          <Box sx={{ borderTop: "1px solid #e0e0e0", my: 4, }} />

          <Typography sx={{ mt: 4, fontSize: 18 }}>
            <strong>Total Payment:</strong> ₱1,000.00
          </Typography>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              color: "black",
              borderColor: "black",
              textTransform: "none",
              "&:hover": { borderColor: "#333", backgroundColor: "#f5f5f5" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: "#414545",
              color: "white",
              textTransform: "none",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
