import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../common/navbar/Navbar";
import Sidebar from "../common/sidebar/Sidebar";
import FooterLayout from "./FooterLayout";
import { useAuthStore } from "../../store/auth/authStore";

export default function HomeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Enables programmatic navigation
  const {logout} = useAuthStore((state) => state); // Assuming you have a logout function in your auth store

  const handleLogout = () => {
    console.log("Logging out...");
    logout(); // Call the logout function from your auth store

    // Add your logout logic here, like clearing auth tokens
    navigate("/login"); // Redirect to login page
  };

  const handleNavigate = (path: string) => {
    navigate(path); 
    setSidebarOpen(false); 
  };

  return (
    <div>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
        <Outlet />
      <FooterLayout />
    </div>
  );
}
