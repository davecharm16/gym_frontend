import StatCard from "./components/StatCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VerifiedIcon from "@mui/icons-material/Verified";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import PersonIcon from "@mui/icons-material/Person";
import WelcomeBanner from "./components/WelcomeBanner";
import { useAuthStore } from "../../store/auth/authStore";
import { Button } from "@mui/material";

export default function Dashboard() {
  const { user } = useAuthStore();
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <div className="flex flex-row  align-self-center  w-full max-w-12/13 justify-between ">
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

            "&:hover": {
              backgroundColor: "#181C14",
              borderColor: "#1a1a1a",
            },
          }}
        >
          Make Payment
        </Button>
      </div>
      <div className="p-8 flex flex-wrap gap-4 items-center justify-center">
        <StatCard
          icon={<VerifiedIcon sx={{ fontSize: 52 }} />} // 48px is a common large size
          label="Total Membership"
          value={6}
        />

        <StatCard
          icon={<AttachMoneyIcon sx={{ fontSize: 52 }} />}
          label="Daily Earned"
          value={6}
        />
        <StatCard
          icon={<EventRepeatIcon sx={{ fontSize: 52 }} />}
          label="Monthly Membership"
          value={6}
        />
        <StatCard
          icon={<PersonIcon sx={{ fontSize: 52 }} />}
          label="Session Membership"
          value={6}
        />
      </div>
    </div>
  );
}
