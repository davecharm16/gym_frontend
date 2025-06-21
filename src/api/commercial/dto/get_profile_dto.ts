// src/services/profile/dto/GetProfileResponse.dto.ts

export type TrainingDTO = {
  id: string;
  title: string;
  description: string;
  base_fee: number;
  instructor_id: string;
};

export type StudentProfileDTO = {
  id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  address: string;
  birthdate: string;
  subscription_type_id: string;
  subscription_type: {name: string} | null;
  paid_until: string;
  created_at: string;
  trainings: TrainingDTO[];
  role: 'student';
};

export type InstructorProfileDTO = {
  id: string;
  name: string;
  created_at: string;
  role: 'instructor';
};

export type AdminProfileDTO = {
  id: string;
  full_name: string;
  super_admin: boolean;
  created_at: string;
  role: 'admin';
};

export type GetProfileResponseDTO =
  | StudentProfileDTO
  | InstructorProfileDTO
  | AdminProfileDTO;
