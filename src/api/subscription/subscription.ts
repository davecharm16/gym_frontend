import { apiClient } from "../apiClient";
import { endPoint } from "../api";
import type { ApiResponse } from "../../types/api_response";
import type { CreateSubscriptionType, SubscriptionType } from "../../types/subscription";
import type { SubscriptionTypeDTO } from "../commercial/dto/subscription_dto";
import { createSubscriptionModelToDTO, subscriptionTypeDTOToModel } from "../commercial/adapter/subscription_adapter";

/**
 * Fetch all subscription types
 */
export const getSubscriptionTypes = async (): Promise<ApiResponse<SubscriptionType[]>> => {
  try {
    const res = await apiClient.get<SubscriptionTypeDTO[]>(endPoint.subscriptions);
    const adaptedData = res.data?.map((data) => subscriptionTypeDTOToModel(data)) || [];

    return {
      ...res,
      data: adaptedData,
    };
  } catch (error) {
    console.error("fetch subscription types failed:", error);
    throw error;
  }
};

/**
 * Create a new subscription type
 */
export const createSubscriptionService = async (
  payload: CreateSubscriptionType
): Promise<ApiResponse<SubscriptionType>> => {
  try {
    const res = await apiClient.post<SubscriptionTypeDTO>(endPoint.subscriptions, createSubscriptionModelToDTO(payload));
    const adaptedData = subscriptionTypeDTOToModel(res.data!);

    return {
      ...res,
      data: adaptedData,
    };
  } catch (error) {
    console.error("create subscription failed:", error);
    throw error;
  }
};
