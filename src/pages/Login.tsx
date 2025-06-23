import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth/authStore";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import backgroundImage from "../assets/images/login-background.png";
import {
  TextField,
  IconButton,
  InputAdornment,
  Button,
  CircularProgress,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await login({ email, password });

      if (!res) {
        toast.error("Invalid email or password");
        return;
      }

      toast.success("Login successful!");

      if (res.role === "admin") navigate("/");
      else if (res.role === "student") navigate("/student");
      else toast.error("Unauthorized role");
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ───── Background Image ───── */}
      <div className="w-1/2 hidden md:block relative">
        <img
          src={backgroundImage}
          alt="Login"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
      </div>

      {/* ───── Login Form ───── */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 bg-white">
        <form className="w-full max-w-md">
          <h1 className="text-4xl font-black text-center mb-8 tracking-tight">
            Login
          </h1>

          {/* Email Field */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            type={showPwd ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPwd(!showPwd)} edge="end">
                    {showPwd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Login Button */}
          <Button
            variant="outlined"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              mt: 4,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              backgroundColor: "#3C3D37",
              color: "#fff",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#181C14",
                borderColor: "#1a1a1a",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>

      {/* ───── Toast Container ───── */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Login;
