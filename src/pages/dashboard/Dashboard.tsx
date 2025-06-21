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
import PaymentModal from "./components/PaymentModal";
import { useState } from "react";

export default function Dashboard() {
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* ───── Header row ───── */}
      <div className="flex flex-row w-full justify-between items-center px-4 mx-auto">
        <WelcomeBanner name={user?.email ?? ""} />
        <Button
          variant="outlined"
          onClick={() => setOpenPaymentModal(true)}
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
      <div className="w-full px-4 mx-auto mt-2 mb-4">
        <div className="row gy-4">
          <div className="col-6 col-md-4 col-lg-3">
            <StatCard
              icon={<VerifiedIcon sx={{ fontSize: 42 }} />}
              label="Total Membership"
              value={6}
            />
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <StatCard
              icon={<AttachMoneyIcon sx={{ fontSize: 42 }} />}
              label="Daily Earned"
              value={6}
            />
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <StatCard
              icon={<EventRepeatIcon sx={{ fontSize: 42 }} />}
              label="Monthly Membership"
              value={6}
            />
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <StatCard
              icon={<PersonIcon sx={{ fontSize: 42 }} />}
              label="Session Membership"
              value={6}
            />
          </div>
        </div>
      </div>

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
      <PaymentModal
        open={openPaymentModal}
        onClose={() => setOpenPaymentModal(false)}
      />
    </div>
  );
}
