// store/student/studentStore.ts
import { create } from "zustand";
import type { Student } from "../../types/students";
import { getStudents as fetchStudentsAPI } from "../../api/student/students";

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
  getStudents: () => Promise<void>;
}

export const useStudentStore = create<StudentState>((set) => ({
  students: [],
  loading: false,
  error: null,

  getStudents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchStudentsAPI();
      if (response.success && Array.isArray(response.data)) {
        set({ students: response.data, loading: false });
      } else {
        set({ error: response.message || "Failed to fetch students", loading: false });
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      set({ error: "An error occurred while fetching students", loading: false });
    }
  },
}));
