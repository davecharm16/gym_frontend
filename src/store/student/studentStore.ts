// store/student/studentStore.ts
import { create } from "zustand";
import type { Student, StudentCheckIn } from "../../types/students";
import { checkInStudentApi, deleteStudent, getStudents as fetchStudentsAPI, registerStudent, updateStudent, } from "../../api/student/students";
import type { RegisterStudentFormSchema } from "../../utils/schema/registerStudentSchema";
import type { ApiResponse } from "../../types/api_response";
import type { UpdateStudentFormSchema } from "../../utils/schema/updateSchema";

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;

  /* search UI state */
  searchQuery: string;
  selectedCategory: string;

  /* actions */
  getStudents: (subscriptionName?: string) => Promise<Student[] | null>;
  registerStudent: (payload: RegisterStudentFormSchema) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  deleteStudent: (id: string) => void;
  checkInStudent: (studentCheckInData: StudentCheckIn) => Promise<ApiResponse<null> | null>;
  updateStudent: (id: string, form: UpdateStudentFormSchema) => Promise<void>;
}

export const useStudentStore = create<StudentState>((set, get) => ({
  /* --- state --- */
  students: [],
  loading: false,
  error: null,
  searchQuery: "",
  selectedCategory: "All",

  /* --- actions --- */
  getStudents: async (subscriptionName?: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetchStudentsAPI({
        subscriptionName: subscriptionName ?? 'all',
      });
  
      if (response.success && Array.isArray(response.data)) {
        set({ students: response.data });
        return response.data;
      } else {
        set({ error: response.message || "Failed to fetch students" });
      }
    } catch (err) {
      console.error("fetch students failed:", err);
      set({ error: "An error occurred while fetching students" });
    } finally {
      set({ loading: false });
    }
    return null;
  },

  registerStudent: async (payload: RegisterStudentFormSchema) => {
    set({ loading: true, error: null });
    try {
      const res = await registerStudent(payload);
      if (res.success) {
       console.log("Student registered successfully:", res.data);
       get().getStudents(); // Refresh student list after registration
      } else {
        set({ error: res.message || "Registration failed" });
        throw new Error(res.message || "Registration failed");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({ error: err.message || "Registration failed" });
      throw err; // so UI can show snackbar / dialog
    } finally {
      set({ loading: false });
    }
  },

  checkInStudent: async (studentCheckInData: StudentCheckIn) => {
    set({ loading: true, error: null });
    try {
      const response = await checkInStudentApi(studentCheckInData);
      console.log("check-in response:", response);
      if (response.success) {
        console.log("Student checked in successfully");
        return response; // Return data if needed
      } else {
        set({ error: response.message || "Check-in failed" });
        return response;
      }
    } catch (err) {
      console.error("check-in student failed:", err);
      set({ error: "An error occurred while checking in student" });
    } finally {
      set({ loading: false });
    }
    return null; 
  },

  deleteStudent: async (id: string) => {
    set({ loading: true });
    try {
      await deleteStudent(id);
      set((state) => ({
        students: state.students.filter((s) => s.id !== id),
      }));
      return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // set({ error: "Failed to delete student" });
      console.log('Error', error);
      // return false;
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateStudent: async (id, form) => {
    set({ loading: true, error: null });

    try {
      await updateStudent(id, form); // This already maps and transforms internally
        get().getStudents();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
      console.error('Update failed:', err);
      set({ error: err?.message || 'Failed to update student' });
    } finally { 
      set({ loading: false });
    }
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));


