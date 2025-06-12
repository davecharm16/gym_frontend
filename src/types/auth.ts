import type { UserRole } from "../constant/roles";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

