import React, { useEffect, useState } from "react";
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
import { useStudentStore } from "../../../store/student/studentStore";
import { usePaymentStore } from "../../../store/payments/payments";


import { paymentSchema } from "../../../utils/schema/paymentSchema";
import Dropdown from "./Dropdown";
import SearchDropdown from "../../../components/common/SearchableDropdown";
import type { PaymentRequestDto } from "../../../api/commercial/dto/payments_dto";
import { toast } from "sonner";


export type PaymentModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const { trainings, fetchTrainings } = useTrainingStore();
  const { subscriptions, getSubscriptionTypes } = useSubscriptionStore();
  const {
    students,
    getStudents,
    loading: isLoadingStudents,
  } = useStudentStore();
  const { createPayment } = usePaymentStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
 

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      studentId: "",
      paymentFor: "misc",
      amountToPay: "",
      amount: "",
      paymentDate: "",
      paymentMethod: "cash",
      change: "",
      discountValue: 0,
    },
    resolver: yupResolver(paymentSchema as never),
  });

  const selectedPaymentFor = useWatch({ control, name: "paymentFor" });
  const amountGiven = parseFloat(watch("amount") || "0");
  const amountToPay = parseFloat(watch("amountToPay") || "0");
  const discount =  watch("discountValue") || 0;
  const discountAmount = amountToPay* watch("discountValue") / 100;
  const netAmountToPay = Math.max(amountToPay - discountAmount, 0);

  

  useEffect(() => {
    if (open) {
      fetchTrainings();
      getSubscriptionTypes();
      getStudents();
      const today = new Date().toISOString().split("T")[0];
      setValue("paymentDate", today);
    } else {
      reset();
    }
  }, [open]);

  useEffect(() => {
    const change =
      amountGiven > amountToPay ? (amountGiven - amountToPay).toFixed(2) : "0";
    setValue("change", change);
  }, [amountGiven, amountToPay, setValue]);

  useEffect(() => {
    const change =
      amountGiven > netAmountToPay
        ? (amountGiven - netAmountToPay).toFixed(2)
        : "0";
    setValue("change", change);
  }, [amountGiven, netAmountToPay, setValue]);

  useEffect(() => {
    if (selectedPaymentFor === "misc") return;

    const foundTraining = trainings.find((t) => t.id === selectedPaymentFor);
    const foundSubscription = subscriptions.find(
      (s) => s.id === selectedPaymentFor
    );

    if (foundTraining) {
      setValue("amountToPay", foundTraining.baseFee.toString());
    } else if (foundSubscription) {
      setValue("amountToPay", foundSubscription.amount?.toString() ?? "");
    }
  }, [selectedPaymentFor, trainings, subscriptions, setValue]);

  const combinedOptions = [
    { label: "Misc.", value: "misc" },
    ...trainings.map((t) => ({ label: `Training: ${t.title}`, value: t.id })),
    ...subscriptions.map((s) => ({
      label: `Subscription: ${s.name}`,
      value: s.id,
    })),
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      let payment_type = "misc";
      const foundTraining = trainings.find((t) => t.id === data.paymentFor);
      const foundSubscription = subscriptions.find(
        (s) => s.id === data.paymentFor
      );

      if (foundTraining) {
        payment_type = foundTraining.title;
      } else if (foundSubscription) {
        payment_type = foundSubscription.name;
      }

      const payload: PaymentRequestDto = {
        student_id: data.studentId,
        amount: Number(data.amount),
        amount_to_pay: Number(data.amountToPay),
        payment_method: data.paymentMethod,
        payment_type,
        discount_value: data.discountValue,
        // Only include paid_at if it's different from today
        ...(data.paymentDate !== new Date().toISOString().split("T")[0] && {
          paid_at: new Date(data.paymentDate).toISOString(),
        }),
      };

      const result = await createPayment(payload);

      if (result) {
        toast.success("Payment successfully recorded!");
        onClose();
        onSuccess?.();
      } else {
        toast.error("Failed to record payment");
      }
    } finally {
      setIsSubmitting(false);
    }
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
              <SearchDropdown
                name="studentId"
                label="Select Student"
                control={control}
                options={students.map((s) => ({
                  label: `${s.first_name} ${s.last_name}`,
                  value: s.id,
                }))}
                loading={isLoadingStudents}
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
                    height={"100%"}
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
                    helperText={errors.paymentDate?.message || "Select payment date (can be historical)"}
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
                    <MenuItem value="online">Online</MenuItem>
                  </TextField>
                )}
              />

              <Controller
                name="discountValue"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Discount"
                    type="number"
                    fullWidth
                    error={!!errors.discountValue}
                    helperText={errors.discountValue?.message}
                  />
                )}
              />
            </Stack>
          </Stack>

          <Box sx={{ borderTop: "1px solid #e0e0e0", my: 4 }} />
          <Stack spacing={1.5} sx={{ mt: 3 }}>
            <Typography sx={{ fontSize: 18 }}>Discount: {discount}%</Typography>

            <Typography sx={{ fontSize: 18 }}>
              Total Payment: ₱{netAmountToPay.toFixed(2)}
            </Typography>

            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
              Change:{" "}
              <span
                style={{
                  fontWeight: 600,
                }}
              >
                ₱{watch("change")}
              </span>
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              sx={{ backgroundColor: "#414545", color: "white" }}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
