import type { Student, StudentCheckIn } from "../../../types/students";
import type { RegisterStudentFormSchema } from "../../../utils/schema/registerStudentSchema";
import type { CreateStudentRequestDTO, CreateStudentResponseDTO, StudentCheckInDTO } from "../dto/student_dto";
import { format } from "date-fns";

export const toStudentModel = (dto: CreateStudentResponseDTO): Partial<Student> => ({
  id: dto.id,
  email: dto.email,
  user_id: "", // not returned in create response
  first_name: "",
  last_name: "",
  middle_name: "",
  sex: "",
  address: "",
  birthdate: "",
  enrollment_date: "",
  picture_url: "",
  created_at: "",
  subscription_type_id: null,
  subscription_type_name: null,
  subscription_fee: null,
});

export const toCreateStudentDTO = (
  form: RegisterStudentFormSchema
): CreateStudentRequestDTO => ({
  email: form.email,
  password: form.password,
  role: "student", // fixed value
  first_name: form?.first_name,
  last_name: form?.last_name,
  middle_name: form?.middle_name || "",
  sex: form.sex as "male" | "female",
  address: form.address,
  birthdate: format(form.birthdate, 'yyyy-MM-dd'),
  enrollment_date: format(form.enrollment_date, 'yyyy-MM-dd'),
  subscription_type_id: form?.subscription_type_id || null,
  picture_url: "",
});

export const toStudentCheckInDTO = (studentCheckInData: StudentCheckIn): StudentCheckInDTO => {
  // Extract date parts
  const year = studentCheckInData.date.getFullYear();
  const month = String(studentCheckInData.date.getMonth() + 1).padStart(2, "0");
  const day = String(studentCheckInData.date.getDate()).padStart(2, "0");

  // Extract time parts
  const hours = String(studentCheckInData.time.getHours()).padStart(2, "0");
  const minutes = String(studentCheckInData.time.getMinutes()).padStart(2, "0");
  const seconds = String(studentCheckInData.time.getSeconds()).padStart(2, "0");

  // Combine into local ISO-like string
  const localDateTimeString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  return {
  student_email: studentCheckInData.email,
  checkin_time: format(new Date(localDateTimeString), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
  }
};