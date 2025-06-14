import type { Student } from "../../../types/students";
import type { RegisterStudentFormSchema } from "../../../utils/schema/registerStudentSchema";
import type { CreateStudentRequestDTO, CreateStudentResponseDTO } from "../dto/student_dto";
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