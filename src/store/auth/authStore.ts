import { create } from "zustand";
import { loginUser } from "../../api/auth/auth";
import type { LoginRequest, User } from "../../types/auth";
import type { UserRole } from "../../constant/roles";

// Helper to get user from localStorage if needed (optional)
const getInitialToken = () => localStorage.getItem("token");
const getInitialRefreshToken = () => localStorage.getItem("refreshToken");
// You might optionally store the user object too
const getInitialUser = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;

  login: (creds: LoginRequest) => Promise<void>;
  logout: () => void;

  isAuthenticated: () => boolean;
  hasRole: (roles: UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: getInitialUser(),
  token: getInitialToken(),
  refreshToken: getInitialRefreshToken(),
  loading: false,
  error: null,

  login: async (creds) => {
    set({ loading: true, error: null });
    try {
      const res = await loginUser(creds);
      if (res.success && res.data) {
        const newUser: User = {
          ...res.data.user,
          role: res.data.user.role.toLowerCase() as UserRole,
        };
        const { token, refresh_token } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refresh_token);
        localStorage.setItem("user", JSON.stringify(newUser)); // Persist user

        set({
          user: newUser,
          token,
          refreshToken: refresh_token,
          loading: false,
          error: null,
        });
      } else {
        set({ error: res.message || "Login failed", loading: false });
      }
    } catch (err: unknown) {
      console.error("Login error:", err);
      set({ error: "An unexpected error occurred", loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    set({ user: null, token: null, refreshToken: null });
  },

  isAuthenticated: () => !!get().user && !!get().token,

  hasRole: (roles: UserRole[]) => {
    const user = get().user;
    return !!user && roles.includes(user.role);
  },
}));
