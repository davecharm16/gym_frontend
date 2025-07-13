import { useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { requestResetPassword, resetPassword } from "../../../api/auth/auth";
import { toast } from "sonner";

type PasswordManagementProps = {
  email: string;
  userId: string;
};

export default function PasswordManagement({
  email,
  userId,
}: PasswordManagementProps) {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState<"reset" | "email" | null>(null);

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading("reset");
    try {
      const res = await resetPassword({ user_id: userId, newPassword });
      if (res.success) {
        toast.success("Password reset successfully.");
        setNewPassword("");
      } else {
        toast.error(res.message || "Something went wrong.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      toast.error("Unexpected error. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const handleSendResetEmail = async () => {
    setLoading("email");
    try {
      const res = await requestResetPassword({ email });
      if (res.success) {
        toast.success("Password reset email sent. Check the inbox.");
      } else {
        toast.success(res.message || "Something went wrong.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      toast.error("Unexpected error. Please try again.");
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
        onClick={handleResetPassword}
        disabled={loading === "reset"}
        startIcon={loading === "reset" && <CircularProgress size={18} />}
        sx={{
          backgroundColor: "#3C3D37",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#2c2d2a",
          },
        }}
      >
        {loading === "reset" ? "Resetting..." : "Reset"}
      </Button>

      <Button
        variant="outlined"
        onClick={handleSendResetEmail}
        disabled={loading === "email"}
        startIcon={loading === "email" && <CircularProgress size={18} />}
        sx={{
          color: "#3C3D37",
          borderColor: "#3C3D37",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#f5f5f5",
            borderColor: "#3C3D37",
          },
        }}
      >
        {loading === "email" ? "Sending..." : "Send Email"}
      </Button>
    </Box>
  );
}
  