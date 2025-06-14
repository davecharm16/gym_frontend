import StatCard from "./components/StatCard";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'; // or your preferred icon
import WelcomeBanner from "./components/WelcomeBanner";
import { useAuthStore } from "../../store/auth/authStore";


export default function Dashboard() {
  const { user } = useAuthStore();
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <WelcomeBanner name={user?.email ?? ''} />
      <div className="p-6 flex flex-wrap gap-4 items-center justify-center">
        <StatCard
          icon={<EmojiEventsOutlinedIcon fontSize="large" />}
          label="Total Membership"
          value={6}
        />
        <StatCard
          icon={<EmojiEventsOutlinedIcon fontSize="large" />}
          label="Total Membership"
          value={6}
        />
        <StatCard
          icon={<EmojiEventsOutlinedIcon fontSize="large" />}
          label="Total Membership"
          value={6}
        />
        <StatCard
          icon={<EmojiEventsOutlinedIcon fontSize="large" />}
          label="Total Membership"
          value={6}
        />
      </div>
    </div>
  )
}
