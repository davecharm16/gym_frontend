import { create } from 'zustand';
import { getTotalRegistered } from '../../api/dashboard/dashboard';
import type { TotalRegisteredModel } from '../../types/dashboard';


interface StatsState {
  totalRegistered: TotalRegisteredModel | null;
  isLoadingTotal: boolean;
  fetchTotalRegistered: (filter?: string) => Promise<TotalRegisteredModel | null>;
}

export const useStatsStore = create<StatsState>((set) => ({
  totalRegistered: null,
  isLoadingTotal: false,

  fetchTotalRegistered: async (filter = 'all') => {
    set({ isLoadingTotal: true });

    try {
      const response = await getTotalRegistered(filter);
      const model = response.data;
      set({ totalRegistered: model });
      return model ?? null;
    } catch (error) {
      console.error('Failed to fetch total registered:', error);
      return null;
    } finally {
      set({ isLoadingTotal: false });
    }
  },
}));
