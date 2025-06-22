// src/services/commercial/payment/createPayment.ts

import type { ApiResponse } from "../../types/api_response";
import type { PaymentAverageModel, PaymentModel } from "../../types/payments";
import { endPoint } from "../api";
import { apiClient } from "../apiClient";
import { paymentAdapterDTOtoModel, paymentAverageDtoToModel } from "../commercial/adapter/payments_adapter";
import type {
  PaymentAverageDTO,
  PaymentRequestDto,
  PaymentResponseDto,
} from "../commercial/dto/payments_dto";

export const createPayment = async (
  payload: PaymentRequestDto
): Promise<ApiResponse<PaymentModel>> => {
  try {
    const res = await apiClient.post<PaymentResponseDto>(
      endPoint.payment,
      payload
    );

    return {
      ...res,
      data: paymentAdapterDTOtoModel(res.data!),
    };
  } catch (error) {
    console.error("createPayment failed:", error);
    throw error;
  }
};

export const getPaymentAverages = async (): Promise<ApiResponse<PaymentAverageModel>> => {
  try {
    const res = await apiClient.get<PaymentAverageDTO>(endPoint.paymentAverage);
    return {
      ...res,
      data: paymentAverageDtoToModel(res.data!),
    };
  } catch (error) {
    console.error('getPaymentAverages failed:', error);
    throw error;
  }
};