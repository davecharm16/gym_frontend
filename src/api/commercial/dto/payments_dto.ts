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