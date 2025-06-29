import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { requestResetPassword, resetPassword } from "../../../api/auth/auth";
import { useToastStore } from "../../../store/toastStore";

type PasswordManagementProps = {
  email: string;
  userId: string;
};

export default function PasswordManagement({ email, userId }: PasswordManagementProps) {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState<"reset" | "email" | null>(null);
  const { showToast } = useToastStore();

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      showToast("Password must be at least 6 characters.", "error");
      return;
    }

    setLoading("reset");
    try {
      const res = await resetPassword({ user_id: userId, newPassword });
      if (res.success) {
        showToast("Password reset successfully.", "success");
        setNewPassword("");
      } else {
        showToast(res.message || "Something went wrong.", "error");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      showToast("Unexpected error. Please try again.", "error");
    } finally {
      setLoading(null);
    }
  };

  const handleSendResetEmail = async () => {
    setLoading("email");
    try {
      const res = await requestResetPassword({ email });
      if (res.success) {
        showToast("Password reset email sent. Check the inbox.", "success");
      } else {
        showToast(res.message || "Something went wrong.", "error");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      showToast("Unexpected error. Please try again.", "error");
    } finally {
      setLoading(null);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mt: 2,
        flexWrap: "wrap",
      }}
    >
      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        disabled={loading === "reset"}
        size="small"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleResetPassword}
        disabled={loading === "reset"}
        startIcon={loading === "reset" && <CircularProgress size={18} />}
      >
        {loading === "reset" ? "Resetting..." : "Reset"}
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        onClick={handleSendResetEmail}
        disabled={loading === "email"}
        startIcon={loading === "email" && <CircularProgress size={18} />}
      >
        {loading === "email" ? "Sending..." : "Send Email"}
      </Button>
    </Box>
  );
}
