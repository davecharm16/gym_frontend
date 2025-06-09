import { useState } from 'react';
import Navbar from '../common/navbar/Navbar';
import Sidebar from '../common/sidebar/Sidebar';
import FooterLayout from './FooterLayout';
import { Outlet } from 'react-router-dom';

export default function HomeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const handleNavigate = (path: string) => {
    console.log(`Navigating to ${path}`);
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
