import { create } from 'zustand';
import type { PaymentRequestDto } from '../../api/commercial/dto/payments_dto';
import { createPayment, getPaymentAverages } from '../../api/payments/payments';
import type { PaymentAverageModel, PaymentModel } from '../../types/payments';

type PaymentState = {
  isLoading: boolean;
  error: string | null;
  averages: PaymentAverageModel | null;
  successMessage: string | null;
  createPayment: (payload: PaymentRequestDto) => Promise<PaymentModel | null>;
  resetStatus: () => void;
  fetchPaymentAverages: () => Promise<PaymentAverageModel | null>;
};

export const usePaymentStore = create<PaymentState>((set) => ({
  isLoading: false,
  error: null,
  successMessage: null,
  averages: null,

  createPayment: async (payload: PaymentRequestDto) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const response = await createPayment(payload);
      const payment = response.data ?? null;

      set({ isLoading: false, successMessage: 'Payment successfully recorded!' });
      return payment;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Failed to create payment';
      set({ isLoading: false, error: message });
      return null;
    }
  },

  fetchPaymentAverages: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await getPaymentAverages();
      const average = res.data ?? null;
      set({ averages: average, isLoading: false });
      return average;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ isLoading: false, error: error?.message ?? 'Failed to fetch payment averages' });
      return null;
    }
  },

  resetStatus: () => set({ error: null, successMessage: null }),
}));