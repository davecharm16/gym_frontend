// src/routes/sidebarRoutes.tsx
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
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
    path: "/attendance-log",
    label: "Attendance Log",
    icon: <AssignmentIcon />,
    roles: ["admin"],
  },

  /* ---------- student‑only ----------- */
  {
    path: "/student",
    label: "My Dashboard",
    icon: <SchoolIcon />,
    roles: ["student"],
  },
];
