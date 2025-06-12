import { Navigate, } from 'react-router-dom';
import { useAuthStore } from '../store/auth/authStore';
import type { UserRole } from '../constant/roles';
import HomeLayout from './layout/HomeLayout';

export type ProtectedRouteProps = {
  allowedRoles: UserRole[];
  children: React.ReactNode; // 👈 add this
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const hasRole = useAuthStore((state) => state.hasRole(allowedRoles));

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!hasRole) return <Navigate to="/unauthorized" replace />;

  return <HomeLayout />;
};

export default ProtectedRoute;
