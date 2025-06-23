import { create } from 'zustand';
import { getPaymentReport } from '../../api/payments/payments';
import type { PaymentReportModel } from '../../types/payments';


interface PaymentReportState {
  report: PaymentReportModel | null;
  loading: boolean;
  fetchReport: (filters?: {
    start_date?: string;
    end_date?: string;
    payment_type?: string;
    payment_method?: string;
  }) => Promise<PaymentReportModel | null>;
}

export const usePaymentReportStore = create<PaymentReportState>((set) => ({
  report: null,
  loading: false,

  fetchReport: async (filters = {}) => {
    set({ loading: true });
    try {
      const response = await getPaymentReport(filters);
      set({ report: response.data });
      return response.data ?? null;
    } catch (error) {
      console.error('Failed to fetch payment report:', error);
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));
