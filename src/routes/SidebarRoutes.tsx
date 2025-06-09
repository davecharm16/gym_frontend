// src/routes/sidebarRoutes.tsx
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';

export const SidebarRoutes = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    path: "/profile-management",
    label: "Profile Management",
    icon: <PersonIcon />,
  },
  {
    path: "/attendance-log",
    label: "Attendance Log",
    icon: <AssignmentIcon />,
  },
  {
    path: "/logout",
    label: "Logout",
    icon: <LogoutIcon />,
  },
];
