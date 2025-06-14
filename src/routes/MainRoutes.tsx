import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import HomeLayout from "../components/layout/HomeLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ProfileManagement from "../pages/profile-management/ProfileManagement";
import AttendanceLog from "../pages/attendance/AttendanceLog";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";


export const MainRoutes = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <ProtectedRoute allowedRoles={['admin']}> <HomeLayout/> </ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "/profile-management",
        element: <ProfileManagement/>,
      },

       {
        path: "/attendance-log",
        element: <AttendanceLog/>,
      },
    ],
  },
]);
