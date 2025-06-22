// src/services/dto/payment/paymentRequestDto.ts

export interface PaymentRequestDto {
  student_id: string;
  amount: number;
  payment_type: 'training_fee' | 'subscription_fee' | 'misc';
  payment_method: 'cash' | 'gcash';
  amount_to_pay: number;
}


export interface PaymentResponseDto {
  id: string;
  student_id: string;
  amount: number;
  payment_type: 'training_fee' | 'subscription_fee' | 'misc';
  paid_at: string; // ISO 8601 string format
  payment_method: 'cash' | 'gcash';
  amount_to_pay: number;
  change: number;
};