import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth/authStore';
import {jwtDecode} from 'jwt-decode';
import type { UserRole } from '../constant/roles';

export type ProtectedRouteProps = {
  allowedRoles: UserRole[];
  children: React.ReactNode;
};

interface DecodedToken {
  exp: number;
}

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const now = Date.now() / 1000; // in seconds
    return decoded.exp < now;
  } catch (e : unknown) {
    console.error("Error decoding token:", e);
    return true;
  }
};

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const token = useAuthStore(state => state.token);
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  const isExpired = isTokenExpired(token);

  if (!token || !user || isExpired) {
    if (isExpired) logout(); // Clear state if token is expired
    return <Navigate to="/login" replace />;
  }

  const hasRole = allowedRoles.includes(user.role);
  if (!hasRole) return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
