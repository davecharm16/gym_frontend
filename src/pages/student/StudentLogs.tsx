import { useState, useMemo, useEffect } from "react";
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
  Grid,
} from "@mui/material";
import CheckInModal from "./CheckInModal";
import { useStudentStore } from "../../store/student/studentStore";
import { useToastStore } from "../../store/toastStore";
import { useAuthStore } from "../../store/auth/authStore";
import { useAttendanceStore } from "../../store/student_attendance/studentAttendanceStore";
import { useProfileStore } from "../../store/profile/profileStore";

export default function StudentLogs() {
  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { checkInStudent } = useStudentStore();
  const { fetchProfile, profile } = useProfileStore();
  const { showToast } = useToastStore();
  const { user } = useAuthStore();
  const { fetchAttendances, attendances } = useAttendanceStore();

  const rows = useMemo(
    () =>
      attendances.map((item) => {
        const dateObj = new Date(item.checkinTime);
        return {
          name: `${item.student.firstName} ${item.student.lastName}`,
          email: item.student.email,
          date: dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          time: dateObj.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        };
      }),
    [attendances]
  );

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (user?.id && profile) {
      fetchAttendances(profile.id);
    }
  }, [user?.id, fetchAttendances, profile]);

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
        await fetchAttendances(profile?.id ?? "");
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
        marginTop:"15vh",
        minHeight: "100vh",
        px: 2,
      }}
    >
      <Grid
       
        sx={{
          width: "100%",
          maxWidth: 1300,
          p: 4,
         
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Check-In Logs
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Manage check-in records
        </Typography>

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
              borderRadius: 0,"&:hover": { backgroundColor: "#333a3a" },
            }}
          >
            Check In
          </Button>
        </Stack>

        <TableContainer sx={{  border: "1px solid #e0e0e0" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f9f9f9" }}>
              <TableRow>
                {["Name", "Email", "Date", "Time"].map((label) => (
                  <TableCell
                    key={label}
                    sx={{ fontSize: "15px", fontWeight: "bold", color: "#424242" }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row, idx) => (
                  <TableRow key={idx} hover>
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
      </Grid>

      <CheckInModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmCheckIn}
        email={user?.email ?? ""}
      />
    </Box>
  );
}
