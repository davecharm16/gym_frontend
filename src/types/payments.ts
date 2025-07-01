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
  discountValue: number;
}

export interface PaymentAverageModel {
  averagePerWeek: number;
  averagePerMonth: number;
}
export interface PaymentStudentSubscriptionType {
  id: string;
  name: string;
}

export interface PaymentStudent {
  id: string;
  email: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  subscription_type: PaymentStudentSubscriptionType | null;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  amount_to_pay: number;
  change: number;
  payment_type: string;
  discountValue: string;
  payment_method: string;
  paid_at: string;
  student: PaymentStudent | null;
}

export interface PaymentSummary {
  total_amount: number;
  total_amount_to_pay: number;
  total_change: number;
}

export interface PaymentReportModel {
  records: PaymentRecord[];
  summary: PaymentSummary;
}
