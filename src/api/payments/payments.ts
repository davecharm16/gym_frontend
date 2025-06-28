// src/services/commercial/payment/createPayment.ts

import type { ApiResponse } from "../../types/api_response";
import type { PaymentAverageModel, PaymentModel, PaymentReportModel } from "../../types/payments";
import { endPoint } from "../api";
import { apiClient } from "../apiClient";
import { adaptPaymentReport, paymentAdapterDTOtoModel, paymentAverageDtoToModel } from "../commercial/adapter/payments_adapter";
import type {
  PaymentAverageDTO,
  PaymentReportDTO,
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



export const getPaymentReport = async (
  filters: {
    start_date?: string;
    end_date?: string;
    payment_type?: string;
    payment_method?: string;
  } = {}
): Promise<ApiResponse<PaymentReportModel>> => {
  try {
    const res = await apiClient.get<PaymentReportDTO>(endPoint.paymentReport, {
      params: filters,
    });

    console.log(res.data);

    return {
      ...res,
      data: adaptPaymentReport(res.data!),
    };
  } catch (error) {
    console.error('❌ Error in getPaymentReport:', error);
    throw error;
  }
};