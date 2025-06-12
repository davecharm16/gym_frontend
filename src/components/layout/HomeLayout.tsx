import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../common/navbar/Navbar';
import Sidebar from '../common/sidebar/Sidebar';
import FooterLayout from './FooterLayout';

export default function HomeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Enables programmatic navigation

  const handleLogout = () => {
    console.log('Logging out...');
    // Add your logout logic here, like clearing auth tokens
    navigate('/login'); // Redirect to login page
  };

  const handleNavigate = (path: string) => {
    navigate(path); // ✅ Navigates to the specified path
    setSidebarOpen(false); // Close sidebar after navigation
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
      <main>
        <Outlet />
      </main>
      <FooterLayout />
    </div>
  );
}
