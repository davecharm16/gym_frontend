// src/components/modals/PaymentModal.tsx
import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTrainingStore } from "../../../store/trainings/trainings";
import { useSubscriptionStore } from "../../../store/subscriptions/subscriptionsStore";

import { paymentSchema } from "../../../utils/schema/paymentSchema";
import Dropdown from "./Dropdown";

type PaymentFormValues = {
  memberName: string;
  paymentFor: string; // training id or subscription id or 'misc'
  amountToPay: string;
  amount: string;
  paymentDate: string;
  paymentMethod: string;
  change: string;
};

export type PaymentModalProps = {
  open: boolean;
  onClose: () => void;
};

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onClose }) => {
  const { trainings, fetchTrainings } = useTrainingStore();
  const { subscriptions, getSubscriptionTypes } = useSubscriptionStore();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    defaultValues: {
      memberName: "",
      paymentFor: "misc",
      amountToPay: "",
      amount: "",
      paymentDate: "",
      paymentMethod: "cash",
      change: "",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(paymentSchema as any),
  });

  const selectedPaymentFor = useWatch({ control, name: "paymentFor" });
  const amountGiven = parseFloat(watch("amount") || "0");
  const amountToPay = parseFloat(watch("amountToPay") || "0");

  useEffect(() => {
    if (open) {
      fetchTrainings();
      getSubscriptionTypes();
    } else {
      reset();
    }
  }, [open]);

  // Compute change dynamically
  useEffect(() => {
    const change =
      amountGiven > amountToPay
        ? (amountGiven - amountToPay).toFixed(2)
        : "0";
    setValue("change", change);
  }, [amountGiven, amountToPay, setValue]);

  // Auto-fill amountToPay if a known item is selected
  useEffect(() => {
    if (selectedPaymentFor === "misc") return;

    const foundTraining = trainings.find((t) => t.id === selectedPaymentFor);
    const foundSubscription = subscriptions.find((s) => s.id === selectedPaymentFor);

    if (foundTraining) {
      setValue("amountToPay", foundTraining.baseFee.toString());
    } else if (foundSubscription) {
      setValue("amountToPay", foundSubscription.amount?.toString() ?? '');
    }
  }, [selectedPaymentFor, trainings, subscriptions, setValue]);

  const combinedOptions = [
    { label: "Misc.", value: "misc" },
    ...trainings.map((t) => ({
      label: `Training: ${t.title}`,
      value: t.id,
    })),
    ...subscriptions.map((s) => ({
      label: `Subscription: ${s.name}`,
      value: s.id,
    })),
  ];

  const onSubmit = (data: PaymentFormValues) => {
    console.log("Payment submitted:", data);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "95%",
          maxWidth: 900,
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Add Payment
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="memberName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Member Name"
                    fullWidth
                    error={!!errors.memberName}
                    helperText={errors.memberName?.message}
                  />
                )}
              />
              <Controller
                name="paymentFor"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label="Pay type/for"
                    value={field.value}
                    onChange={field.onChange}
                    options={combinedOptions}
                    width="100%"
                  />
                )}
              />
              <Controller
                name="amountToPay"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Amount to Pay"
                    type="number"
                    fullWidth
                    error={!!errors.amountToPay}
                    helperText={errors.amountToPay?.message}
                  />
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Given Amount"
                    type="number"
                    fullWidth
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                  />
                )}
              />
              <Controller
                name="paymentDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Payment Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    error={!!errors.paymentDate}
                    helperText={errors.paymentDate?.message}
                  />
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Payment Method"
                    fullWidth
                    error={!!errors.paymentMethod}
                    helperText={errors.paymentMethod?.message}
                  >
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="gcash">Gcash</MenuItem>
                  </TextField>
                )}
              />
              <Controller
                name="change"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Change"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                )}
              />
            </Stack>
          </Stack>

          <Box sx={{ borderTop: "1px solid #e0e0e0", my: 4 }} />

          <Typography sx={{ fontSize: 18 }}>
            <strong>Total Payment:</strong> ₱
            {watch("amount") || watch("amountToPay") || "0.00"}
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "#414545", color: "white" }}
            >
              Save
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
