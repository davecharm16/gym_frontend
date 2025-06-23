// src/services/dto/payment/paymentRequestDto.ts

export interface PaymentRequestDto {
  student_id: string;
  amount: number;
  payment_type: string;
  payment_method: string;
  amount_to_pay: number;
}


export interface PaymentResponseDto {
  id: string;
  student_id: string;
  amount: number;
  payment_type: string;
  paid_at: string; // ISO 8601 string format
  payment_method: string;
  amount_to_pay: number;
  change: number;
};
export interface PaymentAverageDTO {
  average_per_week: number,
  average_per_month: number
}

export interface PaymentStudentSubscriptionTypeDTO {
  id: string;
  name: string;
}

export interface PaymentStudentDTO {
  id: string;
  email: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  subscription_type: PaymentStudentSubscriptionTypeDTO | null;
}

export interface PaymentRecordDTO {
  id: string;
  amount: number;
  amount_to_pay: number;
  change: number;
  payment_type: string;
  payment_method: string;
  paid_at: string;
  student: PaymentStudentDTO | null;
}

export interface PaymentSummaryDTO {
  total_amount: number;
  total_amount_to_pay: number;
  total_change: number;
}

export interface PaymentReportDTO {
  records: PaymentRecordDTO[];
  summary: PaymentSummaryDTO;
}
