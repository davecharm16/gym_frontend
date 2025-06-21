// src/store/profile/profileStore.ts

import { create } from 'zustand';
import type { ProfileModel } from '../../types/profile';
import { getProfileData } from '../../api/user/get_profile';


type ProfileStore = {
  profile: ProfileModel | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<ProfileModel>; // now returns the model
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  loading: false,
  error: null,

  fetchProfile: async () => {
    set({ loading: true, error: null });

    try {
      const data = await getProfileData();
      set({ profile: data, loading: false });
      return data; // ✅ explicitly return the fetched profile
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err : any) {
      console.error('Failed to load profile:', err);
      const errorMessage = err.message || 'Failed to fetch profile';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage); // ✅ rethrow to allow caller to handle
    }
  },

  clearProfile: () => {
    set({ profile: null, error: null });
  },
}));
