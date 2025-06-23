import type { ApiResponse } from "../../types/api_response";
import type { TotalRegisteredModel } from "../../types/dashboard";
import { endPoint } from "../api";
import { apiClient } from "../apiClient";
import { adaptTotalRegistered } from "../commercial/adapter/dashboard_adapter";
import type { TotalRegisteredDTO } from "../commercial/dto/dashboard_dto";


export const getTotalRegistered = async (
  subscriptionTypeName: string = 'all'
): Promise<ApiResponse<TotalRegisteredModel>> => {
  try {
    const res = await apiClient.get<TotalRegisteredDTO>(endPoint.totalRegistered, {
      params: { subscription_type_name: subscriptionTypeName },
    });

    const adaptedData = adaptTotalRegistered(res.data!);

    return {
      ...res,
      data: adaptedData,
    };
  } catch (error) {
    console.error('fetch total registered failed:', error);
    throw error;
  }
};
