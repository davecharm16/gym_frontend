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
