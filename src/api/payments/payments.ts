// src/services/commercial/payment/createPayment.ts

import type { ApiResponse } from "../../types/api_response";
import type { PaymentModel } from "../../types/payments";
import { endPoint } from "../api";
import { apiClient } from "../apiClient";
import { paymentAdapterDTOtoModel } from "../commercial/adapter/payments_adapter";
import type {
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
