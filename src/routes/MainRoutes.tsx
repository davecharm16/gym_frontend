import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import HomeLayout from "../components/layout/HomeLayout";
import Dashboard from "../pages/Dashboard";
import ProfileManagement from "../pages/ProfileManagement";
import AttendanceLog from "../pages/AttendanceLog";

export const MainRoutes = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },

  {
    path: "/",
    element: <HomeLayout />,
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
