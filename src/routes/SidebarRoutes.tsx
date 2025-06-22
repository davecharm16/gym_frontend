// src/routes/sidebarRoutes.tsx
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import SettingsIcon from "@mui/icons-material/Settings";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import type { UserRole } from "../constant/roles";

export interface SidebarRoute {
  path: string;
  label: string;
  icon: React.ReactNode;
  roles: UserRole[]; // ⬅️ NEW
}

export const sidebarRoutes: SidebarRoute[] = [
  /* ---------- admin‑only ------------- */
  {
    path: "/",
    label: "Dashboard",
    icon: <DashboardIcon />,
    roles: ["admin"],
  },
  {
    path: "/profile-management",
    label: "Profile Management",
    icon: <PersonIcon />,
    roles: ["admin"],
  },
  {
    path: "/payment-logs",
    label: "Payment Logs",
    icon: <CurrencyExchangeIcon />,
    roles: ["admin"],
  },
  {
    path: "/attendance-logs",
    label: "Attendance Log",
    icon: <AssignmentIcon />,
    roles: ["admin"],
  },
  {
    path: "/system-settings",
    label: "System Settings",
    icon: <SettingsIcon />,
    roles: ["admin"],
  },

  /* ---------- student‑only ----------- */
  {
    path: "/student",
    label: "My Dashboard",
    icon: <SchoolIcon />,
    roles: ["student"],
  },

  {
    path: "/student/student-logs",
    label: "My Logs",
    icon: <SchoolIcon />,
    roles: ["student"],
  },
];
