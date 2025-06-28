// src/store/enrollment/studentEnrollmentStore.ts
import { create } from "zustand";
import type { EnrollRequestDTO, EnrollResponseDTO } from "../../api/commercial/dto/enrollment_dto";
import { enrollStudent } from "../../api/enroll/enrollment";


type EnrollmentState = {
  isLoading: boolean;
  error: string | null;
  enroll: (payload: EnrollRequestDTO) => Promise<EnrollResponseDTO | null>;
};

export const useStudentEnrollmentStore = create<EnrollmentState>((set) => ({
  isLoading: false,
  error: null,
  enroll: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const result = await enrollStudent(payload);
      set({ isLoading: false });
      return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({ isLoading: false, error: err.message || "Enrollment failed" });
      return null;
    }
  },
}));
