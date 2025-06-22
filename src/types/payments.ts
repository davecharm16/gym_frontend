import type { Dayjs } from "dayjs";

export interface PaymentModel {
  id: string;
  studentId: string;
  amount: number;
  paymentType: string;
  paidAt: Dayjs;
  paymentMethod: string;
  amountToPay: number;
  change: number;
}

export interface PaymentAverageModel {
  averagePerWeek: number;
  averagePerMonth: number;
}