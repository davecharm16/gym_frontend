export interface AttendanceDTO {
  id: string;
  student_id: string;
  checkin_time: string; // ISO 8601
  created_at: string;   // ISO 8601
  students: StudentDTO;
}

export interface StudentDTO {
  email: string;
  address: string;
  birthdate: string; // ISO 8601
  last_name: string;
  first_name: string;
  subscription_type_id: string | null;
  age: number;
  picture_url: string | null;
}
