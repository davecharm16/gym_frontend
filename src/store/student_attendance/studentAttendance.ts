import { create } from 'zustand';
import { getStudenAttendance } from '../../api/student/students';
import type { ApiResponse } from '../../types/api_response';
import type { StudentAttendance } from '../../types/student_attendance';

type AttendanceStore = {
  attendances: StudentAttendance[];
  loading: boolean;
  selectedStudentId?: string;
  error?: string;
  fetchAttendances: (studentId?: string) => Promise<void>;
  setSelectedStudent: (studentId: string | undefined) => void;
};

export const useAttendanceStore = create<AttendanceStore>((set) => ({
  attendances: [],
  loading: false,
  selectedStudentId: undefined,
  error: undefined,

  fetchAttendances: async (studentId) => {
    set({ loading: true, error: undefined });

    try {
      const res: ApiResponse<StudentAttendance[]> = await getStudenAttendance(studentId);
      if (res.success) {
        set({ attendances: res.data ?? [] });
      } else {
        set({ error: res.message || 'Failed to fetch attendance' });
      }
    } catch (e) {
      console.error(e);
      set({ error: 'An unexpected error occurred while fetching attendance.' });
    } finally {
      set({ loading: false });
    }
  },

  setSelectedStudent: (studentId) => {
    set({ selectedStudentId: studentId });
  },
}));
