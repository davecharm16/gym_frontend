import { useEffect, useState } from "react";
import { TextField, MenuItem, Stack, Button, Autocomplete, Box, Typography } from "@mui/material";
import AttendanceTable from "./components/AttendanceLog"; // path unchanged
import { Search, CheckCircle } from "@mui/icons-material";
import { useAttendanceStore } from "../../store/student_attendance/studentAttendanceStore";
import { useStudentStore } from "../../store/student/studentStore";
import { useToastStore } from "../../store/toastStore";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { Student } from "../../types/students";

export default function AttendanceLog() {
  /* local UI state */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  
  /* admin check-in state */
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [checkInLoading, setCheckInLoading] = useState(false);

  const { fetchAttendances, attendances, loading } = useAttendanceStore();
  const { students, getStudents, checkInStudent } = useStudentStore();
  const { showToast } = useToastStore();

  useEffect(() => {
    fetchAttendances(undefined, dayjs(selectedDate).format("YYYY-MM-DD"));
  }, [fetchAttendances, selectedDate]);

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  const handleCheckIn = async () => {
    if (!selectedStudent) {
      showToast("Please select a student first", "error");
      return;
    }

    setCheckInLoading(true);
    try {
      const now = new Date();
      const result = await checkInStudent({
        email: selectedStudent.email,
        date: now,
        time: now,
      });

      if (result?.success) {
        showToast(`${selectedStudent.first_name} ${selectedStudent.last_name} checked in successfully`, "success");
        setSelectedStudent(null);
        // Refresh attendance logs
        fetchAttendances(undefined, dayjs(selectedDate).format("YYYY-MM-DD"));
      } else {
        showToast(result?.message || "Check-in failed", "error");
      }
    } catch (error) {
      console.error("Check-in error:", error);
      showToast("An error occurred during check-in", "error");
    } finally {
      setCheckInLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="mt-16 flex flex-col px-4 pt-12">
        <h2 className="text-sm font-black pb-8">Attendance Log</h2>

        {/* Admin Check-In Section */}
        <Box mb={4} p={3} bgcolor="#f8f9fa" borderRadius={2} border="1px solid #e9ecef">
          <Typography variant="h6" fontWeight="bold" mb={2} fontSize="16px">
            Admin Check-In
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "center" }}
          >
            <Autocomplete
              options={students}
              getOptionLabel={(student) => `${student.first_name} ${student.last_name} (${student.email})`}
              value={selectedStudent}
              onChange={(_, newValue) => setSelectedStudent(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search and select student"
                  variant="outlined"
                  size="small"
                  sx={{
                    width: { xs: "100%", sm: 400 },
                    "& .MuiInputBase-root": {
                      fontSize: "14px",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "14px",
                    },
                  }}
                />
              )}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleCheckIn}
              disabled={!selectedStudent || checkInLoading}
              startIcon={<CheckCircle />}
              sx={{
                textTransform: "none",
                backgroundColor: "#414545",
                "&:hover": { backgroundColor: "#333a3a" },
                width: { xs: "100%", sm: "auto" },
                minWidth: 140,
              }}
            >
              {checkInLoading ? "Checking in..." : "Check In"}
            </Button>
          </Stack>
        </Box>

        {/* Logs Filter Section */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          mb={4}
          alignItems={{ xs: "stretch", sm: "center" }}
          width="100%"
        >
          <DatePicker
            label="Filter by Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            slotProps={{
              textField: {
                variant: "outlined",
                size: "small",
                fullWidth: true,
                sx: {
                  width: { xs: "100%", sm: 220 },
                  fontSize: "12px",
                  "& .MuiInputBase-root": {
                    fontSize: "14px",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "14px",
                  },
                },
              },
            }}
          />

          <TextField
            label="Search Name"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            sx={{
              width: { xs: "100%", sm: 300 },
              fontSize: "12px",
              "& .MuiInputBase-root": {
                fontSize: "14px",
              },
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
            }}
            InputProps={{
              endAdornment: <Search sx={{ color: "#757575", ml: 1 }} />,
            }}
          />

          <TextField
            label="Filter by Type"
            variant="outlined"
            size="small"
            select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            fullWidth
            sx={{
              width: { xs: "100%", sm: 200 },
              fontSize: "12px",
              "& .MuiInputBase-root": {
                fontSize: "14px",
              },
              "& .MuiInputLabel-root": {
                fontSize: "14px",
              },
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Session">Session</MenuItem>
          </TextField>
        </Stack>

        {/* table now receives the filter props */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <AttendanceTable
            searchQuery={searchQuery}
            selectedType={selectedType}
            data={attendances}
          />
        )}
      </div>
    </LocalizationProvider>
  );
}
