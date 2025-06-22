// src/utils/schema/paymentSchema.ts
import * as yup from 'yup';

export const paymentSchema = yup.object().shape({
  studentId: yup.string().required('Student selection is required'),

  paymentFor: yup
    .string()
    .required('Payment type is required'),

  amountToPay: yup
    .number()
    .typeError('Amount to pay must be a number')
    .required('Amount to pay is required')
    .min(0, 'Amount to pay must be at least 0'),

  amount: yup
    .number()
    .typeError('Given amount must be a number')
    .required('Given amount is required')
    .min(0, 'Given amount must be at least 0')
    .test(
      'is-enough',
      'Given amount must not be less than amount to pay',
      function (value) {
        const { amountToPay } = this.parent;
        return value >= parseFloat(amountToPay || '0');
      }
    ),

  paymentDate: yup
    .string()
    .required('Payment date is required'),

  paymentMethod: yup
    .string()
    .required('Payment method is required'),

  change: yup
    .string()
    .notRequired(),
});
