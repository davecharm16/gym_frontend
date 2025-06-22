// src/store/training/trainingStore.ts
import { create } from 'zustand';
import { getTrainings } from '../../api/training/training';
import type { TrainingModel } from '../../types/training';


interface TrainingState {
  trainings: TrainingModel[];
  loading: boolean;
  error: string | null;
  fetchTrainings: () => Promise<TrainingModel[] | null>;
}

export const useTrainingStore = create<TrainingState>((set) => ({
  trainings: [],
  loading: false,
  error: null,

  fetchTrainings: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getTrainings();
      const data = response.data ?? [];
      set({ trainings: data, loading: false });
      return data;
    } catch (error) {
      console.error('Failed to fetch trainings', error);
      set({ loading: false, error: 'Failed to fetch trainings' });
      return null;
    }
  },
}));
