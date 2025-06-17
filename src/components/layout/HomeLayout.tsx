import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../common/navbar/Navbar";
import Sidebar from "../common/sidebar/Sidebar";
import FooterLayout from "./FooterLayout";
import { Box } from "@mui/material";

const drawerWidth = 240;

export default function HomeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setSidebarOpen(false); // optional: close drawer after navigating
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
          marginLeft: sidebarOpen ? `${drawerWidth}px` : "60px", // 60px for mini drawer
          transition: "margin 0.3s ease-in-out",
        }}
      >
        <Navbar onMenuClick={toggleSidebar} />
        <Box sx={{ padding: 3}}>
          <Outlet />
        </Box>
        <FooterLayout />
      </Box>
    </Box>
  );
}
