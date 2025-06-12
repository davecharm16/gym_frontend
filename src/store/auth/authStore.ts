import { create } from 'zustand';
import { loginUser } from '../../api/auth/auth';
import type { LoginRequest, User } from '../../types/auth';
import type { UserRole } from '../../constant/roles';


interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;

  login: (creds: LoginRequest) => Promise<void>;
  logout: () => void;

  // Optional helpers for RBAC
  isAuthenticated: () => boolean;
  hasRole: (roles: UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  refreshToken: null,

  login: async (creds) => {
    const { user, token, refresh_token } = await loginUser(creds);
    const newUser: User = {
      ...user,
      role: 'student', 
    };
    set({ user: newUser, token, refreshToken: refresh_token });
  },

  logout: () => set({ user: null, token: null, refreshToken: null }),

  isAuthenticated: () => !!get().user && !!get().token,

  hasRole: (roles: UserRole[]) => {
    const user = get().user;
    return !!user && roles.includes(user.role);
  },
}));

