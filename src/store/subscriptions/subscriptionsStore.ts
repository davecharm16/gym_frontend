import { create } from "zustand";
import type { CreateSubscriptionType, EditSubscriptionType, SubscriptionType } from "../../types/subscription";
import { createSubscriptionService, editSubscriptionType, getSubscriptionTypes } from "../../api/subscription/subscription";


interface SubscriptionState {
  subscriptions: SubscriptionType[];
  loading: boolean;
  error: string | null;

  // Actions
  getSubscriptionTypes: () => Promise<void>;
  resetSubscriptions: () => void;
  createSubscription: (payload:CreateSubscriptionType) => Promise<SubscriptionType 
  | undefined > | null;
  editSubscription: (payload:EditSubscriptionType, id : string) => Promise<SubscriptionType 
  | undefined > | null;
}
 
export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
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

  editSubscription: async (payload, id) => {
    set({ loading: true, error: null });
    try {
      const res = await editSubscriptionType(payload, id);
      console.log("Fetched subscription types:", res.data);
      if (res.success) {
        get().getSubscriptionTypes();
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
    get().getSubscriptionTypes();
  },
  resetSubscriptions: () => set({ subscriptions: [], error: null, loading: false }),
}));
