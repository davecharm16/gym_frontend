import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import HomeLayout from "../components/layout/HomeLayout";
import Dashboard from "../pages/Dashboard";
import ProfileManagement from "../pages/ProfileManagement";
import AttendanceLog from "../pages/AttendanceLog";
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
    element: <ProtectedRoute allowedRoles={['student']}> <HomeLayout/> </ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Dashboard/>,
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
