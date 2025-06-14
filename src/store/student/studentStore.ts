// store/student/studentStore.ts
import { create } from "zustand";
import type { Student } from "../../types/students";
import { getStudents as fetchStudentsAPI, } from "../../api/student/students";

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;

  /* search UI state */
  searchQuery: string;
  selectedCategory: string;

  /* actions */
  getStudents: () => Promise<void>;
  registerStudent: (payload: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
}

export const useStudentStore = create<StudentState>((set) => ({
  /* --- state --- */
  students: [],
  loading: false,
  error: null,
  searchQuery: "",
  selectedCategory: "All",

  /* --- actions --- */
  getStudents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchStudentsAPI();
      if (response.success && Array.isArray(response.data)) {
        set({ students: response.data });
      } else {
        set({ error: response.message || "Failed to fetch students" });
      }
    } catch (err) {
      console.error("fetch students failed:", err);
      set({ error: "An error occurred while fetching students" });
    } finally {
      set({ loading: false });
    }
  },

  registerStudent: async () => {
    // set({ loading: true, error: null });
    // try {
    //   const res = await createStudent(payload);
    //   if (res.success) {
    //     set((s) => ({ students: [...s.students, res.data] }));
    //   } else {
    //     set({ error: res.message || "Registration failed" });
    //     throw new Error(res.message || "Registration failed");
    //   }
    // } catch (err: any) {
    //   set({ error: err.message || "Registration failed" });
    //   throw err; // so UI can show snackbar / dialog
    // } finally {
    //   set({ loading: false });
    // }
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
