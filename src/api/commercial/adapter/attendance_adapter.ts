import type { StudentAttendance } from "../../../types/student_attendance";
import type { AttendanceDTO } from "../dto/attendance_dto";


export function toStudentAttendanceModel(dto: AttendanceDTO): StudentAttendance {
  return {
    attendanceId: dto.id,
    studentId: dto.student_id,
    checkinTime: dto.checkin_time,
    createdAt: dto.created_at,
    student: {
      email: dto.students.email,
      address: dto.students.address,
      birthdate: dto.students.birthdate,
      lastName: dto.students.last_name,
      firstName: dto.students.first_name,
      subscriptionTypeId: dto.students.subscription_type_id,
      age: dto.students.age,
    }
  };
}
