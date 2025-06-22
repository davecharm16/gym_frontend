// src/store/payments.ts

import { create } from 'zustand';
import type { PaymentRequestDto } from '../../api/commercial/dto/payments_dto';
import { createPayment } from '../../api/payments/payments';
import type { PaymentModel } from '../../types/payments';

type PaymentState = {
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  createPayment: (payload: PaymentRequestDto) => Promise<PaymentModel | null>;
  resetStatus: () => void;
};

export const usePaymentStore = create<PaymentState>((set) => ({
  isLoading: false,
  error: null,
  successMessage: null,

  createPayment: async (payload) => {
    set({ isLoading: true, error: null, successMessage: null });
    try {
      const response = await createPayment(payload);

      // Ensure fallback to null if data is undefined
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

  resetStatus: () => set({ error: null, successMessage: null }),
}));
