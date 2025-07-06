import type { ApiResponse } from "@/types/api_response";
import type { StudentData } from "../../../pages/profile-management/components/ViewModal";
import type { Student, StudentCheckIn } from "../../../types/students";
import type { RegisterStudentFormSchema } from "../../../utils/schema/registerStudentSchema";
import type { CreateStudentRequestDTO, CreateStudentResponseDTO, StudentCheckInDTO, UpdateStudentDTO, UploadProfileImageResponse } from "../dto/student_dto";
import { format } from "date-fns";

export const toStudentModel = (dto: CreateStudentResponseDTO): Partial<Student> => ({
  id: dto.id,
  email: dto.email, // not returned in create response
  first_name: "",
  last_name: "",
  middle_name: "",
  address: "",
  birthdate: "",
  created_at: "",
  subscription_type_id: undefined,
  subscription_type: undefined,
});

export const toCreateStudentDTO = (
  form: RegisterStudentFormSchema
): CreateStudentRequestDTO => ({
  email: form.email,
  password: form.password,
  role: "student", // fixed value
  first_name: form.first_name,
  last_name: form.last_name,
  middle_name: form.middle_name || "",
  sex: form.sex as "male" | "female",
  address: form.address,
  birthdate: format(form.birthdate, 'yyyy-MM-dd'),
  enrollment_date: format(form.enrollment_date, 'yyyy-MM-dd'),
  subscription_type_id: form.subscription_type_id ?? undefined,
  picture_url: "",
});



export const toStudentCheckInDTO = (
  studentCheckInData: StudentCheckIn
): StudentCheckInDTO => {
  const { date, time, email } = studentCheckInData;

  const combined = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds()
  );

  return {
    student_email: email,
    checkin_time: combined.toISOString(), // ✅ Accurate UTC with Z
  };
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toUpdateStudentDTO = (formData: StudentData): UpdateStudentDTO => ({
  first_name: formData.first_name,
  last_name: formData.last_name,
  middle_name: formData.middle_name ?? null,
  address: formData.address,
  birthdate: formData.birthdate,
});


export function toUploadProfileImageResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiResponse: ApiResponse<any>
): UploadProfileImageResponse {
  if (
    !apiResponse ||
    !apiResponse.success ||
    !apiResponse.data ||
    typeof apiResponse.data.imageUrl !== "string"
  ) {
    throw new Error("Invalid API response format");
  }

  return {
    imageUrl: apiResponse.data.imageUrl,
  }
}