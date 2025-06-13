import type { ApiResponse } from "../../types/api_response";
import type { Student } from "../../types/students";
import { endPoint } from "../api";
import { apiClient } from "../apiClient";

export const getStudents = async (): Promise<ApiResponse<Student[]>> => {
  try {
    const res = await apiClient.get<Student[]>(endPoint.students);
    return res; // contains success, message, data, error
  } catch (error) {
    console.error("get students failed:", error);
    throw error; // Let caller decide how to handle it
  }
};
