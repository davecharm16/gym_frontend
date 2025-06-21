import { create } from "zustand";
import type { InstructorType } from "../../types/instructor";
import { getInstructor } from "../../api/instructor/instructor";


interface InstructorState {
  instructors: InstructorType[];
  loading: boolean;
  error: string | null;

  // Actions
  getInstructorTypes: () => Promise<void>;
  resetSubscriptions: () => void;

}
 
export const useInstructorStore = create<InstructorState>((set) => ({
  instructors: [],
  loading: false,
  error: null,

    getInstructorTypes: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getInstructor();
      console.log("Fetched instructor types:", res.data);
      if (res.success) {
        set({ instructors: res.data });
      } else {
        set({ error: res.message || "Failed to load subscription types" });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Failed to fetch subscriptions", err);
      set({ error: err.message || "Unexpected error" });
    } finally {
      set({ loading: false });
    }
  },

   
  

  resetSubscriptions: () => set({ instructors: [], error: null, loading: false }),
}));
