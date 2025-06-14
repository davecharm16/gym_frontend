export interface CreateStudentRequestDTO {
  email: string;
  password: string;
  role: "student"; // fixed value, can be a literal type
  first_name: string;
  last_name: string;
  middle_name?: string;
  sex: "male" | "female"; // use union for strict typing
  address: string;
  birthdate: string; // ISO format: "YYYY-MM-DD"
  enrollment_date: string; // ISO format: "YYYY-MM-DD"
  subscription_type_id?: string | null;
  picture_url?: string;
}

export interface CreateStudentResponseDTO {
  id: string;
  email: string;
  role: "student";
  paid_until: string; // ISO timestamp (e.g., "2025-07-14T10:34:48.296Z")
}



