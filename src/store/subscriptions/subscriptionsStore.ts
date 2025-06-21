import { create } from "zustand";
import type { CreateSubscriptionType, SubscriptionType } from "../../types/subscription";
import { createSubscriptionService, getSubscriptionTypes } from "../../api/subscription/subscription";


interface SubscriptionState {
  subscriptions: SubscriptionType[];
  loading: boolean;
  error: string | null;

  // Actions
  getSubscriptionTypes: () => Promise<void>;
  resetSubscriptions: () => void;
  createSubscription: (payload:CreateSubscriptionType) => Promise<SubscriptionType 
  | undefined > | null;
}
 
export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscriptions: [],
  loading: false,
  error: null,

  getSubscriptionTypes: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getSubscriptionTypes();
      console.log("Fetched subscription types:", res.data);
      if (res.success) {
        set({ subscriptions: res.data });
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

   createSubscription: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await createSubscriptionService(payload);
      console.log("Fetched subscription types:", res.data);
      if (res.success) {
       return(res.data)
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

  

  resetSubscriptions: () => set({ subscriptions: [], error: null, loading: false }),
}));
