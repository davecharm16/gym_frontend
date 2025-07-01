import React from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export type TransactionData = {
  id?: string;
  name: string;
  payFor: string;           // e.g. "Monthly Subscription"
  paymentDate: string;      // ISO string or yyyy‑mm‑dd
  change: number;
  paymentMethod: string;    // e.g. "Cash", "GCash"
  amount: number;           // single payment amount
  totalPayment: number;     // running total / balance after this tx
};

type ViewModalProps = {
  open: boolean;
  onClose: () => void;
  transaction: TransactionData | null;
};

/* --------------------------------------------------------
   "Receipt‑style" display helper  – renders a single row  
   with the label left‑aligned and the value right‑aligned.
---------------------------------------------------------*/
function ReceiptRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      width="100%"
      sx={{ py: 1 }} // Add vertical padding between rows
    >
      <Typography fontSize={14} fontWeight={500} color="text.secondary">
        {label}
      </Typography>
      <Typography fontSize={14} fontWeight={600}>
        {value}
      </Typography>
    </Stack>
  );
}

const ViewModal: React.FC<ViewModalProps> = ({ open, onClose, transaction }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", sm: 420 },
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 4,
          boxShadow: 24,
        }}
      >
        {/* Close Icon */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 12, right: 12, color: "grey.600" }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" fontWeight={700} textAlign="center" mb={3}>
          Transaction Receipt
        </Typography>
        <Typography variant="body2" fontWeight={700} textAlign="center" mb={3}>
          TR#:{transaction?.id ?? ''}
        </Typography>
        {transaction ? (
          <Stack spacing={1.5} mb={2}>
            <ReceiptRow label="Name:" value={transaction.name} />
            <ReceiptRow label="Pay Type For:" value={transaction.payFor} />

            <Divider sx={{ my: 1 }} />

            <ReceiptRow
              label="Payment Date:"
              value={new Date(transaction.paymentDate).toLocaleDateString()}
            />
            <ReceiptRow label="Payment Method:" value={transaction.paymentMethod} />

            <Divider sx={{ my: 1 }} />

            <ReceiptRow
              label="Amount Given:"
              value={`₱${transaction.amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}`}
            />

            <ReceiptRow
              label="Change Given:"
              value={`₱${transaction.change.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}`}
            />

            <Divider sx={{ my: 1 }} />

            <ReceiptRow
              label={<strong style={{ fontSize: 16, color: "#000" }}>TOTAL:</strong> as unknown as string}
              value={
                <strong style={{ color: "green", fontSize: 16 }}>
                  ₱{transaction.totalPayment.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </strong>
              }
            />
          </Stack>
        ) : (
          <Typography align="center" color="text.secondary">
            No transaction selected.
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default ViewModal;
