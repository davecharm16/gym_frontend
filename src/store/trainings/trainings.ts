/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import type { EditTrainingModel,  TrainingModel } from "../../types/training";
import { getTrainings, editTraining } from "../../api/training/training";

interface TrainingState {
  trainings: TrainingModel[];
  loading: boolean;
  error: string | null;

  getTrainings: () => Promise<void>;
  resetTrainings: () => void;
  editTraining: (payload: EditTrainingModel, id: string) => Promise<null | undefined> | null;
}

export const useTrainingStore = create<TrainingState>((set, get) => ({
  trainings: [],
  loading: false,
  error: null,

  getTrainings: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getTrainings();
      if (res.success) {
        set({ trainings: res.data ?? [] });
      } else {
        set({ error: res.message || "Failed to load trainings" });
      }
    } catch (err: any) {
      console.error("Failed to fetch trainings", err);
      set({ error: err.message || "Unexpected error" });
    } finally {
      set({ loading: false });
    }
  },


  editTraining: async (payload, id) => {
    set({ loading: true, error: null });
    try {
      const res = await editTraining(payload, id);
      if (res.success) {
        get().getTrainings();
        return res.data;
      } else {
        set({ error: res.message || "Failed to edit training" });
      }
    } catch (err: any) {
      console.error("Failed to edit training", err);
      set({ error: err.message || "Unexpected error" });
    } finally {
      set({ loading: false });
    }
    get().getTrainings();
  },

  resetTrainings: () => set({ trainings: [], error: null, loading: false }),
}));
