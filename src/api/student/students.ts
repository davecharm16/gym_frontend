import type { StudentData } from "../../pages/profile-management/components/ViewModal";
import type { ApiResponse } from "../../types/api_response";
import type { StudentAttendance } from "../../types/student_attendance";
import type { Student, StudentCheckIn } from "../../types/students";
import type { RegisterStudentFormSchema } from "../../utils/schema/registerStudentSchema";
import { endPoint } from "../api";
import { apiClient } from "../apiClient";
import { toStudentAttendanceModel } from "../commercial/adapter/attendance_adapter";
import { toCreateStudentDTO, toStudentCheckInDTO, toStudentModel, toUpdateStudentDTO, toUploadProfileImageResponse } from "../commercial/adapter/student_adapter";
import type { AttendanceDTO } from "../commercial/dto/attendance_dto";
import type { CreateStudentRequestDTO, CreateStudentResponseDTO, UpdateStudentDTO, UploadProfileImageResponse } from "../commercial/dto/student_dto";


export const getStudents = async ({
  subscriptionName = 'all', // Default here
}: {
  subscriptionName?: string;
}): Promise<ApiResponse<Student[]>> => {
  try {
    const res = await apiClient.get<Student[]>(endPoint.students, {
      params: {
        subscription_type_name: subscriptionName,
      },
    });
    return res;
  } catch (error) {
    console.error("get students failed:", error);
    throw error;
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
  studentId?: string,
  date?: string
): Promise<ApiResponse<StudentAttendance[]>> => {
  try {
    console.log(studentId);
    console.log(date);
    const params = new URLSearchParams();
    if (studentId) params.append("student_id", studentId);
    if (date) params.append("date", date);

    const url =
      params.toString().length > 0
        ? `${endPoint.attendance}?${params.toString()}`
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

export const deleteStudent = async (id: string) => {
  try {
    const res = await apiClient.delete(`${endPoint.students}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Delete student failed:", error);
    throw error;
  }
};


export const updateStudent = async (
  id: string,
  form: StudentData
): Promise<void> => {
  try {
    console.log(form)
    const dto: UpdateStudentDTO = toUpdateStudentDTO(form);
    await apiClient.put(`${endPoint.students}/${id}`, dto); // or whatever you need to return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Failed to update student:", error);
    // re-throw if you want the caller’s try/catch to catch it,
    // or handle it here (e.g. set an error state / show toast).
    throw error;
  }
};

export const uploadProfileImage = async (
  userId: string,
  file: File
): Promise<UploadProfileImageResponse> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await apiClient.post<ApiResponse<UploadProfileImageResponse>>(
    endPoint.uploadProfile(userId),
    formData
  );


  if (!response?.data) {
    throw new Error("No response data received.");
  }

  return toUploadProfileImageResponse(response);
};
