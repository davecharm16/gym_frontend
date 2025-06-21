import type { ApiResponse } from "../../types/api_response";
import type { StudentAttendance } from "../../types/student_attendance";
import type { Student, StudentCheckIn } from "../../types/students";
import type { RegisterStudentFormSchema } from "../../utils/schema/registerStudentSchema";
import { endPoint } from "../api";
import { apiClient } from "../apiClient";
import { toStudentAttendanceModel } from "../commercial/adapter/attendance_adapter";
import { toCreateStudentDTO, toStudentCheckInDTO, toStudentModel } from "../commercial/adapter/student_adapter";
import type { AttendanceDTO } from "../commercial/dto/attendance_dto";
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

export const checkInStudentApi = async(data: StudentCheckIn): Promise<ApiResponse<null>> => {
  try {
    const res = await apiClient.post<null>(endPoint.checkIn, toStudentCheckInDTO(data));
    return res; 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data; // Let caller decide how to handle it
  }
}


export const getStudenAttendance = async (
  studentId?: string
): Promise<ApiResponse<StudentAttendance[]>> => {
  try {
    const url = studentId
      ? `${endPoint.attendance}?student_id=${studentId}`
      : endPoint.attendance;

    const res = await apiClient.get<AttendanceDTO[]>(url);

    return {
      ...res,
      data: res.data?.map(toStudentAttendanceModel) ?? [],
    };
  } catch (error) {
    console.error("get student attendance failed:", error);
    throw error;
  }
};