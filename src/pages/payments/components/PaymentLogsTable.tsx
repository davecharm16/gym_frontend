// PaymentLogsTable.tsx - with ViewModal integration
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Pagination,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useMemo } from "react";
import type { PaymentRecord, PaymentSummary } from "../../../types/payments";
import ViewModal, { type TransactionData } from "./ViewModal"; // adjust path if needed

/* --------- sample rows (replace with real data) --------- */

type Props = {
  data: PaymentRecord[];
  summary?: PaymentSummary;
};

type PaymentRow = {
  id: string;
  name: string;
  amount: number;
  trainingCategory: "Weight Training" | "CrossFit" | "Boxing";
  subscription: "Monthly" | "Session";
  paymentMethod: "Cash" | "GCash";
  paymentDate: string; // added for modal
}

const rows: PaymentRow[] = [
  {
    id: "1",
    name: "Dela Cruz, Juan A.",
    amount: 1200,
    trainingCategory: "Weight Training",
    subscription: "Monthly",
    paymentMethod: "Cash",
    paymentDate: "2025-06-15",
  },
  {
    id: "2",
    name: "Reyes, Maria",
    amount: 750,
    trainingCategory: "CrossFit",
    subscription: "Session",
    paymentMethod: "GCash",
    paymentDate: "2025-06-16",
  },
  {
    id: "3",
    name: "Santos, Luis",
    amount: 500,
    trainingCategory: "Boxing",
    subscription: "Session",
    paymentMethod: "Cash",
    paymentDate: "2025-06-17",
  },
];
/* ------------------------------------------------------- */

const rowsPerPage = 10;

const getBadgeColor = (cat: PaymentRow["trainingCategory"]) =>
  cat === "Weight Training"
    ? "#FFB22C"
    : cat === "CrossFit"
    ? "#379777"
    : "#d32f2f";

const PaymentLogsTable:React.FC<Props> = ({data})=>  {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState<TransactionData | null>(null);

  const paginatedRows = useMemo(
    () => rows.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [page]
  );
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handleOpen = (row: PaymentRow) => {
    const tx: TransactionData = {
      name: row.name,
      payFor: `${row.subscription} - ${row.trainingCategory}`,
      paymentDate: row.paymentDate,
      paymentMethod: row.paymentMethod,
      amount: row.amount,
      totalPayment: row.amount, // placeholder – replace with real running total
    };
    setSelectedTx(tx);
    setOpenModal(true);
  };

  return (
    <Box
      width="100%"
      border={1}
      borderColor="#e0e0e0"
      borderRadius={1}
      bgcolor="#fafafa"
    >
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead sx={{ bgcolor: "#f0f0f0" }}>
            <TableRow>
              {[
                "Name",
                "Amount",
                "Training Category",
                "Subscription",
                "Payment Method",
                "Action",
              ].map((label) => (
                <TableCell key={label} sx={{ fontWeight: 700, fontSize: 14 }}>
                  <Box display="flex" alignItems="center">
                    {label}
                    {label !== "Action" && (
                      <Box display="inline-flex" flexDirection="column" ml={0.5}>
                        <ExpandLessIcon sx={{ fontSize: 16, color: "grey.500" }} />
                        <ExpandMoreIcon sx={{ fontSize: 16, color: "grey.500" }} />
                      </Box>
                    )}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  ₱{row.amount.toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.trainingCategory}
                    variant="outlined"
                    size="small"
                    sx={{
                      color: getBadgeColor(row.trainingCategory),
                      borderColor: getBadgeColor(row.trainingCategory),
                      fontWeight: 600,
                      px: 1.5,
                      py: 0.25,
                      fontSize: 13,
                    }}
                  />
                </TableCell>
                <TableCell>{row.subscription}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell>
                  <IconButton color="primary" size="small" onClick={() => handleOpen(row)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2">No payment logs found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-start" px={2} py={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, p) => setPage(p)}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Box>

      {/* View Modal */}
      <ViewModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        transaction={selectedTx}
      />
    </Box>
  );
}

export default PaymentLogsTable;
