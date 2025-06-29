import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionValid, setSessionValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session check error:", error);
          setSessionValid(false);
          setMessage("There was a problem validating your reset link.");
          return;
        }
        if (!data.session) {
          setSessionValid(false);
          setMessage("Invalid or expired link. Please request a new reset email.");
        }
      } catch (err) {
        console.error("Unexpected session check error:", err);
        setSessionValid(false);
        setMessage("Unexpected error while verifying session.");
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        console.error("Password reset error:", error);
        setMessage(error.message || "Failed to reset password. Please try again.");
      } else {
        setMessage("Password reset successfully. Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "2rem" }}>
      <h2>Reset Your Password</h2>
      {!sessionValid ? (
        <p style={{ color: "red" }}>{message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "8px" }}
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
          {message && (
            <p style={{ marginTop: "1rem", color: "gray" }}>{message}</p>
          )}
        </form>
      )}
    </div>
  );
}
