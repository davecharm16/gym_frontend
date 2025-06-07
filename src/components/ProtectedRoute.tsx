import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth/authStore';
import type { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;