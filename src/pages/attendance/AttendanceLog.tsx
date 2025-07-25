import { useEffect, useState } from "react";
import { TextField, MenuItem, Stack } from "@mui/material";
import AttendanceTable from "./components/AttendanceLog"; // path unchanged
import { Search } from "@mui/icons-material";
import { useAttendanceStore } from "../../store/student_attendance/studentAttendanceStore";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

export default function AttendanceLog() {
  /* local UI state */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const { fetchAttendances, attendances, loading } = useAttendanceStore();

  useEffect(() => {
    fetchAttendances(undefined, dayjs(selectedDate).format("YYYY-MM-DD"));
  }, [fetchAttendances, selectedDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="mt-16 flex flex-col px-4 pt-12">
        <h2 className="text-sm font-black pb-8">Attendance Log</h2>

        {/* --- moved search & filter here --- */}
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
