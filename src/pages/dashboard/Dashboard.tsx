import StatCard from "./components/StatCard";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'; // or your preferred icon
import WelcomeBanner from "./components/WelcomeBanner";
import { useAuthStore } from "../../store/auth/authStore";
import { Button } from "@mui/material";


export default function Dashboard() {
  const { user } = useAuthStore();
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <div className="flex flex-row pr-10 align-items-center justify-between">
        <WelcomeBanner name={user?.email ?? ''} />
        <Button className=" rounded hover:bg-blue-600 transition-colors " variant="outlined">
          Make Payment
        </Button>
      </div>
      <div className="p-6 flex flex-wrap gap-4 items-center justify-center">
        <StatCard
          icon={<EmojiEventsOutlinedIcon fontSize="large" />}
          label="Total Membership"
          value={6}
        />
        <StatCard
          icon={<EmojiEventsOutlinedIcon fontSize="large" />}
          label="Daily Earned"
          value={6}
        />
        <StatCard
          icon={<EmojiEventsOutlinedIcon fontSize="large" />}
          label="Monthly Membership"
          value={6}
        />
        <StatCard
          icon={<EmojiEventsOutlinedIcon fontSize="large" />}
          label="Session Membership"
          value={6}
        />
      </div>
    </div>
  )
}
