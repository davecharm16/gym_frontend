import  { Typography } from "@mui/material";
import AttendanceTable from "./components/AttendanceLog";

export default function AttendanceLog() {
  return (
    <div className="p-24">
      <Typography variant="h4" gutterBottom>Attendance Log</Typography>
      <AttendanceTable />
    </div>
  )
}
