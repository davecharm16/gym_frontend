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
    .required('Payment date is required')
    .test(
      'not-future',
      'Payment date cannot be in the future',
      function (value) {
        if (!value) return true; // Let required validation handle empty values
        const paymentDate = new Date(value);
        const today = new Date();
        today.setHours(23, 59, 59, 999); // End of today
        return paymentDate <= today;
      }
    )
    .test(
      'not-too-old',
      'Payment date cannot be more than 1 year in the past',
      function (value) {
        if (!value) return true; // Let required validation handle empty values
        const paymentDate = new Date(value);
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        return paymentDate >= oneYearAgo;
      }
    ),

  paymentMethod: yup
    .string()
    .required('Payment method is required'),

  change: yup
    .string()
    .notRequired(),

  discountValue: yup.number().min(0).max(100).required(),
});
