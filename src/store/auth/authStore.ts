import { create } from 'zustand';
import { loginUser } from '../../api/auth/auth';
import type { LoginRequest, User } from '../../types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  login: (creds: LoginRequest) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  refreshToken: null,
  login: async (creds) => {
    const { user, token, refresh_token } = await loginUser(creds);
    set({ user, token, refreshToken: refresh_token });
  },
  logout: () => set({ user: null, token: null, refreshToken: null }),
}));

