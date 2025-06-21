import { Avatar, Box, Typography} from "@mui/material";
import { useEffect } from "react";
import { useAttendanceStore } from "../../../store/student_attendance/studentAttendance";
import type { StudentAttendance } from "../../../types/student_attendance";



export default function CheckInLogs() {

  const { fetchAttendances, attendances, loading} = useAttendanceStore();

  const checkIns = attendances.slice(0, 12).map((item: StudentAttendance) => {
    const dateObj = new Date(item.checkinTime);
  
    return {
      name: `${item.student.firstName} ${item.student.lastName}`,
      time: dateObj.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      }) + " • " + dateObj.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    };
  });
  
  useEffect(() => {
    fetchAttendances();
  }, [fetchAttendances]);

  return (
    <div className="w-full">
      <Typography
        variant="subtitle1"
        fontWeight={700}
        className="mb-2 pl-2 text-[15px]"
      >
        Latest Check-in Logs
      </Typography>

      <div className="flex flex-col gap-2 border border-gray-300 rounded-md p-3 bg-white">
        {
          loading && (
            <Typography variant="body2" color="text.secondary">
              Loading check-in logs...
            </Typography>
          )
        }
        {checkIns.map((entry, idx) => (
          <Box
            key={idx}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              px: 1.5,
              py: 1,
              bgcolor: "#f9f9f9",
            }}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <Avatar
                src={entry.avatarUrl}
                alt={entry.name}
                sx={{ width: 36, height: 36 }}
              />
              <Typography variant="body2" fontWeight={500}>
                {entry.name}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {entry.time}
            </Typography>
          </Box>
        ))}
      </div>
    </div>
  );
}
