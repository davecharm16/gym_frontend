// src/services/adapters/payment/PaymentAdapter.ts

import dayjs from 'dayjs';
import type { PaymentModel } from '../../../types/payments';
import type { PaymentResponseDto, PaymentRequestDto } from '../dto/payments_dto';


export const paymentAdapterDTOtoModel = (
  dto: PaymentResponseDto
): PaymentModel => ({
  id: dto.id,
  studentId: dto.student_id,
  amount: dto.amount,
  paymentType: dto.payment_type,
  paidAt: dayjs(dto.paid_at),
  paymentMethod: dto.payment_method,
  amountToPay: dto.amount_to_pay,
  change: dto.change,
});

export const paymentAdapterModelToDTO = (
  model: PaymentModel
): PaymentRequestDto => ({
  student_id: model.studentId,
  amount: model.amount,
  payment_type: model.paymentType,
  payment_method: model.paymentMethod,
  amount_to_pay: model.amountToPay,
});
