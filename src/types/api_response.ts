/* eslint-disable @typescript-eslint/no-explicit-any */
// types/ApiResponse.ts
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}