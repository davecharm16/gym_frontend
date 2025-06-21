import StatCard from "./components/StatCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VerifiedIcon from "@mui/icons-material/Verified";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import PersonIcon from "@mui/icons-material/Person";
import WelcomeBanner from "./components/WelcomeBanner";
import { useAuthStore } from "../../store/auth/authStore";
import { Button } from "@mui/material";
import MonthlySubscription from "./components/MonthlySubscription";
import SessionSubscription from "./components/SessionSubscription";
import CheckInLogs from "./components/CheckInLogs";

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* ───── Header row ───── */}
      <div className="flex flex-row w-full justify-between items-center px-4 mx-auto">
        <WelcomeBanner name={user?.email ?? ""} />
        <Button
          variant="outlined"
          sx={{
            height: 50,
            fontSize: "16px",
            width: 200,
            textTransform: "none",
            backgroundColor: "#3C3D37",
            color: "#fff",
            "&:hover": { backgroundColor: "#181C14" },
          }}
        >
          Make Payment
        </Button>
      </div>

      {/* ───── Stat Cards ───── */}
      <div className="px-4 mx-auto py-6">
        <div className="d-flex flex-wrap gap-8">
          <StatCard
            icon={<VerifiedIcon sx={{ fontSize: 45}} />}
            label="Total Membership"
            value={6}
          />
          <StatCard
            icon={<AttachMoneyIcon sx={{ fontSize: 45}} />}
            label="Daily Earned"
            value={6}
          />
          <StatCard
            icon={<EventRepeatIcon sx={{ fontSize: 45}} />}
            label="Monthly Membership"
            value={6}
          />
          <StatCard
            icon={<PersonIcon sx={{ fontSize: 45}} />}
            label="Session Membership"
            value={6}
          />
        </div>
      </div>

      {/* ───── Main Content: Subscriptions and Logs ───── */}
 
<div className="w-full px-4 mx-auto mt-2">
  <div className="row gy-4">
    {/* Left column */}
    <div className="col-12 col-lg-8">
      <div className="mb-4">
        <MonthlySubscription />
      </div>
      <div className="mb-4">
        <SessionSubscription />
      </div>
    </div>

    {/* Right column */}
    <div className="col-12 col-lg-4">
      <div className="mb-4">
        <CheckInLogs />
      </div>
    </div>
  </div>
</div>

    </div>
  );
}
