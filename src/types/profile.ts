// src/services/profile/models/ProfileModel.ts

export type Training = {
  id: string;
  title: string;
  description: string;
  baseFee: number;
  instructorId: string;
};

export type StudentProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  birthdate: string;
  subscriptionTypeId: string;
  paidUntil: string;
  createdAt: string;
  trainings: Training[];
  role: 'student';
};

export type InstructorProfile = {
  id: string;
  name: string;
  createdAt: string;
  role: 'instructor';
};

export type AdminProfile = {
  id: string;
  fullName: string;
  superAdmin: boolean;
  createdAt: string;
  role: 'admin';
};

export type ProfileModel = StudentProfile | InstructorProfile | AdminProfile;
