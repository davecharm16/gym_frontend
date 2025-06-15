import { useState, useMemo } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import CheckInModal from "./CheckInModal";
import { useStudentStore } from "../../store/student/studentStore";
import { useToastStore } from "../../store/toastStore";

type LogRow = {
  name: string;
  email: string;
  date: string;
  time: string;
};

const initialRows: LogRow[] = [
  {
    name: "Juan Dela Cruz",
    email: "juan@example.com",
    date: "06/10/2025",
    time: "09:30 AM",
  },
  {
    name: "Maria Santos",
    email: "maria@example.com",
    date: "06/11/2025",
    time: "10:00 AM",
  },
];

export default function StudentLogs() {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { checkInStudent } = useStudentStore();
  const { showToast } = useToastStore();

  const filteredRows = useMemo(
    () =>
      rows.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.email.toLowerCase().includes(query.toLowerCase())
      ),
    [query, rows]
  );

  const handleConfirmCheckIn = async (data: {
    email: string;
    date: string;
    time: string;
  }) => {
    try {
      const res = await checkInStudent({
        email: data.email,
        date: new Date(data.date),
        time: new Date(`${data.date} ${data.time}`),
      });

      if (res?.success === true) {
        showToast("Check-in successful!", "success");
        setRows((prev) => [
          ...prev,
          { ...data, name: "New Checked In Student" },
        ]);
      } else {
        showToast("Check-in failed. " + res?.message, "error");
      }
    } catch (error) {
      console.error("Check-in error:", error);
      showToast("Check-in failed. Please try again.", "error");
    }

    setOpenModal(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1300,
          p: 4,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Check-In Logs
        </Typography>
        <Typography mb={3}>Manage student check-in records</Typography>

        <Divider sx={{ mb: 3 }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={2}
          mb={3}
        >
          <TextField
            label="Search by name or email"
            variant="outlined"
            size="small"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ width: { xs: "100%", sm: 300 } }}
          />

          <Button
            variant="contained"
            onClick={() => setOpenModal(true)}
            sx={{
              backgroundColor: "#414545",
              textTransform: "none",
              fontWeight: "bold",
              px: 5,
              "&:hover": { backgroundColor: "#333a3a" },
            }}
          >
            Check In
          </Button>
        </Stack>

        <TableContainer sx={{ minHeight: 400 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f4f4f4" }}>
              <TableRow>
                <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell sx={{ fontSize: "18px", fontWeight: "bold" }}>
                  Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.time}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <CheckInModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmCheckIn}
        email=""
      />
    </Box>
  );
}
