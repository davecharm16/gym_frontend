import {
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
  Box,
  InputAdornment,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth/authStore";
import { VisibilityOff, Visibility } from "@mui/icons-material";

const Login = () => {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });

      if (response) {
        // Redirect based on user role
        const userRole = response.role; // Assuming the response contains the user role
        if (userRole === "admin") {
          navigate("/");
        } else if (userRole === "student") {
          navigate("/student");
        } else {
          alert("Unauthorized role");
        }
      }
    } catch {
      alert("Login failed");
    }
  };
  

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
    >
      <Container maxWidth={false} sx={{ width: 600 }}>
        <Paper
          sx={{
            p: 4,
            borderRadius: 2,
            border: "1px solid #ddd",
            boxShadow: "none",
            backgroundColor: "#fff",
            minHeight: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Login
          </Typography>

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            disabled={loading}
            sx={{
              mt: 4,
              height: 48,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
