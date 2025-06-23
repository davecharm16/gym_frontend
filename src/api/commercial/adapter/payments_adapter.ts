// src/services/adapters/payment/PaymentAdapter.ts

import dayjs from 'dayjs';
import type { PaymentAverageModel, PaymentModel, PaymentRecord, PaymentReportModel } from '../../../types/payments';
import type { PaymentResponseDto, PaymentRequestDto, PaymentAverageDTO, PaymentRecordDTO, PaymentReportDTO } from '../dto/payments_dto';


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


export const paymentAverageDtoToModel = (dto: PaymentAverageDTO): PaymentAverageModel => ({
  averagePerWeek: dto.average_per_week,
  averagePerMonth: dto.average_per_month,
});


export const adaptPaymentReport = (dto: PaymentReportDTO): PaymentReportModel => ({
  records: dto.records.map((item: PaymentRecordDTO): PaymentRecord => ({
    ...item,
    student: item.student
      ? {
          ...item.student,
          subscription_type: item.student.subscription_type ?? null,
        }
      : null,
  })),
  summary: dto.summary,
});