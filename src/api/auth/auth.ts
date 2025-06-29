import type { ApiResponse } from "../../types/api_response";
import type { LoginRequest, LoginResponse } from "../../types/auth";
import { endPoint } from "../api";
import { apiClient } from "../apiClient";

export const loginUser = async (
  credentials: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  try {
    const res = await apiClient.post<LoginResponse, LoginRequest>(endPoint.login, credentials);
    return res; // contains success, message, data, error
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Let caller decide how to handle it
  }
};

export const requestResetPassword = async (
  payload: { email: string }
): Promise<ApiResponse<{ message: string }>> => {
  try {
    const res = await apiClient.post<{ message: string }, { email: string }>(
      endPoint.requestPasswordReset,
      payload
    );
    return res;
  } catch (error) {
    console.error("Request reset password failed:", error);
    throw error;
  }
};

// Force Reset Password (admin)
export const resetPassword = async (
  payload: { user_id: string; newPassword: string }
): Promise<ApiResponse<{ message: string }>> => {
  try {
    const res = await apiClient.post<{ message: string }, { user_id: string; newPassword: string }>(
      endPoint.forceResetPassword,
      payload
    );
    return res;
  } catch (error) {
    console.error("Reset password failed:", error);
    throw error;
  }
};

