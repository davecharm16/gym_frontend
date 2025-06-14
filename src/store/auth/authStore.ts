import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../../api/auth/auth";
import type { LoginRequest, User } from "../../types/auth";
import type { UserRole } from "../../constant/roles";

let logoutTimer: ReturnType<typeof setTimeout>;

interface DecodedToken {
  exp: number;
}

const getInitialToken = () => localStorage.getItem("token");
const getInitialRefreshToken = () => localStorage.getItem("refreshToken");
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

  login: (creds: LoginRequest) => Promise<User | null >;
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
        const { token, refresh_token } = res.data;
        const newUser: User = {
          ...res.data.user,
          role: res.data.user.role.toLowerCase() as UserRole,
        };

        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refresh_token);
        localStorage.setItem("user", JSON.stringify(newUser));

        // Decode token to find expiry (exp is in seconds)
        const decoded = jwtDecode<DecodedToken>(token);
        const expiryTime = decoded.exp * 1000;
        const currentTime = Date.now();
        const timeLeft = expiryTime - currentTime;

        // Auto logout after expiry time
        clearTimeout(logoutTimer);
        logoutTimer = setTimeout(() => {
          get().logout();
        }, timeLeft);

        set({
          user: newUser,
          token,
          refreshToken: refresh_token,
          loading: false,
          error: null,
        });
        return newUser; // Return user on successful login
      } else {
        set({ error: res.message || "Login failed", loading: false });
      }
      return null; // Return null if login failed
    } catch (err: unknown) {
      console.error("Login error:", err);
      set({ error: "An unexpected error occurred", loading: false });
      return null;
    }
  },

  logout: () => {
    set({ user: null, token: null, refreshToken: null });
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    clearTimeout(logoutTimer);
  },

  isAuthenticated: () => !!get().user && !!get().token,

  hasRole: (roles: UserRole[]) => {
    const user = get().user;
    return !!user && roles.includes(user.role);
  },
}));
