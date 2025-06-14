import type { RegisterFormInputs } from "../../pages/profile-management/components/RegisterModal";
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

export const registerStudent = async (
  data: RegisterFormInputs
): Promise<ApiResponse<Student>> => {
  try {
    const res = await apiClient.post<Student>(endPoint.students, data);
    return res;
  } catch (error) {
    console.error("register student failed:", error);
    throw error;
  }
};