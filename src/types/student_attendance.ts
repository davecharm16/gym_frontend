export interface StudentAttendance {
  attendanceId: string;
  studentId: string;
  checkinTime: string;  // ISO string
  createdAt: string;    // ISO string
  student: StudentProfile;
}

export interface StudentProfile {
  email: string;
  address: string;
  birthdate: string; // ISO string
  lastName: string;
  firstName: string;
  subscriptionTypeId: string | null;
  age: number;
  picture_url: string | null;
}
