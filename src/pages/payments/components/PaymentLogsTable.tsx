import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  IconButton,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useMemo } from "react";
import type { PaymentRecord, PaymentSummary } from "../../../types/payments";
import ViewModal, { type TransactionData } from "./ViewModal";

type Props = {
  data: PaymentRecord[];
  summary?: PaymentSummary;
};

const rowsPerPage = 10;

const PaymentLogsTable: React.FC<Props> = ({ data }) => {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState<TransactionData | null>(null);

  const paginatedRows = useMemo(
    () => data.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [page, data]
  );
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleOpen = (row: PaymentRecord) => {
    const tx: TransactionData = {
      id: row.id,
      name: `${row.student?.last_name}, ${row.student?.first_name} ${row.student?.middle_name || ""}`,
      payFor: row.payment_type,
      paymentDate: row.paid_at,
      paymentMethod: row.payment_method,
      amount: row.amount,
      totalPayment: row.amount,
    };
    setSelectedTx(tx);
    setOpenModal(true);
  };

  return (
    <Box width="100%" border={1} borderColor="#e0e0e0" borderRadius={1} bgcolor="#fafafa">
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead sx={{ bgcolor: "#f0f0f0" }}>
            <TableRow>
              {[
                "Name",
                "Given Amount",
                "Amount to Pay",
                "Paid For",
                "Paid At",
                "Payment Method",
                "Action",
              ].map((label) => (
                <TableCell key={label} sx={{ fontWeight: 700, fontSize: 14 }}>
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  {`${row.student?.last_name}, ${row.student?.first_name} ${row.student?.middle_name || ""}`}
                </TableCell>
                <TableCell>
                  ₱{Number(row.amount).toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>
                  ₱{Number(row.amount_to_pay).toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>{row.payment_type}</TableCell>
                <TableCell>{new Date(row.paid_at).toLocaleString("en-PH")}</TableCell>
                <TableCell>{row.payment_method}</TableCell>
                <TableCell>
                  <IconButton color="primary" size="small" onClick={() => handleOpen(row)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
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

      <ViewModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        transaction={selectedTx}
      />
    </Box>
  );
};

export default PaymentLogsTable;
