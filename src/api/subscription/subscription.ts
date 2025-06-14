import { apiClient } from "../apiClient";
import { endPoint } from "../api";
import type { ApiResponse } from "../../types/api_response";
import type { SubscriptionType } from "../../types/subscription";
import type { SubscriptionTypeDTO } from "../commercial/dto/subscription_dto";
import { subscriptionTypeDTOToModel } from "../commercial/adapter/subscription_adapter";

export const getSubscriptionTypes = async (): Promise<ApiResponse<SubscriptionType[]>> => {
  try {
    const res = await apiClient.get<SubscriptionTypeDTO[]>(endPoint.subscriptions);
    const adaptedData =  res.data?.map((data)=> subscriptionTypeDTOToModel(data)) || [];

    return {
      ...res,
      data: adaptedData,
    };
  } catch (error) {
    console.error("fetch subscription types failed:", error);
    throw error;
  }
};
