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
    fetchAttendances(undefined, dayjs(selectedDate).format('YYYY-MM-DD'));
  }, [fetchAttendances, selectedDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="mt-12 flex flex-col px-12 pt-12">
        <h1 className="text-lg font-black pb-8">Attendance Log</h1>

        {/* --- moved search & filter here --- */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          mb={4}
          alignItems="flex-start"
        >
          <DatePicker
            label="Filter by Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            slotProps={{
              textField: {
                variant: "outlined",
                size: "medium",
                sx: {
                  width: 220,
                  height: 50,
                  fontSize: "18px",
                  "& .MuiInputBase-root": {
                    height: 50,
                    fontSize: "16px",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "16px",
                  },
                },
              },
            }}
          />
          <TextField
            label="Search Name"
            variant="outlined"
            size="medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: 300,
              height: 50,
              fontSize: "18px",
              "& .MuiInputBase-root": {
                height: 50,
                fontSize: "16px",
              },
              "& .MuiInputLabel-root": {
                fontSize: "16px",
              },
            }}
            InputProps={{
              endAdornment: <Search sx={{ color: "#757575", ml: 1 }} />,
            }}
          />

          <TextField
            label="Filter by Type"
            variant="outlined"
            size="medium"
            select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            sx={{
              width: 200,
              height: 50,
              fontSize: "18px",
              "& .MuiInputBase-root": {
                height: 50,
                fontSize: "16px",
              },
              "& .MuiInputLabel-root": {
                fontSize: "16px",
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
