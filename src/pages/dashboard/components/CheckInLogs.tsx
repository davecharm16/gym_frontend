import { Avatar, Box, Typography} from "@mui/material";

const checkIns = Array.from({ length: 12 }).map(() => ({
  name: "Dela Cruz, Juan",
  time: "11:55 AM",
  avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
}));

export default function CheckInLogs() {
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
