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
  Skeleton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useMemo, useEffect } from "react";
import type { PaymentRecord, PaymentSummary } from "../../../types/payments";
import ViewModal, { type TransactionData } from "./ViewModal";
import { useCsvExport } from "../../../hooks/useCSVExport";
import { Button } from "@mui/material";

type Props = {
  data: PaymentRecord[];
  summary?: PaymentSummary;
};

const rowsPerPage = 20;

const PaymentLogsTable: React.FC<Props> = ({ data }) => {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState<TransactionData | null>(null);
  const [delayedLoading, setDelayedLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setDelayedLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const paginatedRows = useMemo(
    () => data.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [page, data]
  );
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleOpen = (row: PaymentRecord) => {
    const tx: TransactionData = {
      id: row.id,
      name: `${row.student?.last_name}, ${row.student?.first_name} ${
        row.student?.middle_name || ""
      }`,
      payFor: row.payment_type,
      paymentDate: row.paid_at,
      paymentMethod: row.payment_method,
      amount: row.amount,
      change: row.change,
      totalPayment: row.amount_to_pay,
    };
    setSelectedTx(tx);
    setOpenModal(true);
  };

  const exportCsv = useCsvExport<PaymentRecord>();

  const csvFields = [
    { label: "Name", value: "student_full_name" },
    { label: "Given Amount", value: "amount" },
    { label: "Amount to Pay", value: "amount_to_pay" },
    { label: "Discount", value: "discount_value" },
    { label: "Change", value: "change" },
    { label: "Paid For", value: "payment_type" },
    { label: "Paid At", value: "paid_at" },
    { label: "Payment Method", value: "payment_method" },
  ] as const;

  const handleExport = () => {
    // Transform current page data to include student_full_name
    const transformed = paginatedRows.map((row) => ({
      ...row,
      student_full_name: `${row.student?.last_name}, ${
        row.student?.first_name
      } ${row.student?.middle_name || ""}`,
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exportCsv(transformed, csvFields as any, `payments_page_${page}.csv`);
  };
  return (
    <>
      <Box marginBottom={2}>
        <Button
          variant="outlined"
          onClick={handleExport}
          sx={{
            borderColor: "#3C3D37",
            color: "#3C3D37",
            "&:hover": {
              borderColor: "#181C14",
              backgroundColor: "#f5f5f5",
            },
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Export CSV
        </Button>
      </Box>

      <Box
        width="100%"
        border={1}
        borderColor="#e0e0e0"
        borderRadius={1}
        bgcolor="#fafafa"
      >
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Name",
                  "Given Amount",
                  "Amount to Pay",
                  "Discount",
                  "Change",
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
              {delayedLoading ? (
                [...Array(rowsPerPage)].map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    {Array.from({ length: 9 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton variant="text" height={28} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : paginatedRows.length > 0 ? (
                paginatedRows.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      {`${row.student?.last_name}, ${row.student?.first_name} ${
                        row.student?.middle_name || ""
                      }`}
                    </TableCell>
                    <TableCell>
                      ₱
                      {Number(row.amount).toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell>
                      ₱
                      {Number(row.amount_to_pay).toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                        <TableCell>{row.discountValue}</TableCell>
                        <TableCell>{row.change}</TableCell>
                    <TableCell>{row.payment_type}</TableCell>
                    
                    <TableCell>
                      {new Date(row.paid_at).toLocaleString("en-PH")}
                    </TableCell>
                    <TableCell>{row.payment_method}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleOpen(row)}
                      >
                        <VisibilityIcon
                          sx={{
                            color: "#3C3D37", // Replace with your design's primary icon color
                            fontSize: 20, // Optional: adjust size
                            verticalAlign: "middle", // Optional: aligns with text baseline
                          }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body2">
                      No payment logs found.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {!delayedLoading && (
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
        )}

        <ViewModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          transaction={selectedTx}
        />
      </Box>
    </>
  );
};

export default PaymentLogsTable;
