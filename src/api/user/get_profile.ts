import type { ProfileModel } from "../../types/profile";
import { apiClient } from "../apiClient";
import { getProfileAdapter } from "../commercial/adapter/get_profile_adapter";
import type { GetProfileResponseDTO } from "../commercial/dto/get_profile_dto";

export const getProfileData = async (): Promise<ProfileModel> => {
  try {
    const response = await apiClient.get<GetProfileResponseDTO>('/profile');
    console.log(response);
    const dto = response.data;
    const profile = getProfileAdapter(dto!);
    return profile;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw error;
  }
};