import type { ApiResponse } from "../../types/api_response";
import type { Student } from "../../types/students";
import type { RegisterStudentFormSchema } from "../../utils/schema/registerStudentSchema";
import { endPoint } from "../api";
import { apiClient } from "../apiClient";
import { toCreateStudentDTO, toStudentModel } from "../commercial/adapter/student_adapter";
import type { CreateStudentRequestDTO, CreateStudentResponseDTO } from "../commercial/dto/student_dto";


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
  data: RegisterStudentFormSchema
): Promise<ApiResponse<Partial<Student>>> => {
  try {
    const res = await apiClient.post<CreateStudentResponseDTO, CreateStudentRequestDTO>(
      endPoint.register,
      toCreateStudentDTO(data)
    );

    return {
      ...res,
      data: toStudentModel(res.data!),
    };
  } catch (error) {
    console.error("register student failed:", error);
    throw error;
  }
};