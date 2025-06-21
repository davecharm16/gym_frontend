import { useEffect, useState } from "react";
import { TextField, MenuItem, Stack } from "@mui/material";
import AttendanceTable from "./components/AttendanceLog"; // path unchanged
import { Search } from "@mui/icons-material";
import { useAttendanceStore } from "../../store/student_attendance/studentAttendance";

export default function AttendanceLog() {
  /* local UI state */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");

  const { fetchAttendances, attendances, loading} = useAttendanceStore();

  useEffect(() => {
    fetchAttendances();
  }, [fetchAttendances]);
  

  return (
    <div className="mt-12 flex flex-col px-12 pt-12">
      <h1 className="text-lg font-black pb-8">Attendance Log</h1>

      {/* --- moved search & filter here --- */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        mb={4}
        alignItems="flex-start"
      >
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
      {loading ? 
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading...</p>

        </div>
        :
        <AttendanceTable searchQuery={searchQuery} selectedType={selectedType} data={attendances}/>
      }
    </div>
  );
}
