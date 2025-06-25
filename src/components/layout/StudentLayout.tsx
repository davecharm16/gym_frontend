// StudentLayout.tsx

import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../common/navbar/Navbar";
import Sidebar from "../common/sidebar/Sidebar";
import FooterLayout from "./FooterLayout";
import { Box } from "@mui/material";
import { useAuthStore } from "../../store/auth/authStore";

const drawerWidth = 240;

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuthStore((state) => state);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout(); // Clear auth state
    navigate("/login"); // Redirect to login
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setSidebarOpen(false); // Optionally close sidebar
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: sidebarOpen ? `${drawerWidth}px` : "60px",
          transition: "margin 0.3s ease-in-out",
        }}
      >
        <Navbar onMenuClick={toggleSidebar} />
        <Box sx={{ paddingLeft: 6 }}>
          <Outlet />
        </Box>
        <FooterLayout />
      </Box>
    </Box>
  );
}
