import StatCard from "./components/StatCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VerifiedIcon from "@mui/icons-material/Verified";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import PersonIcon from "@mui/icons-material/Person";
import WelcomeBanner from "./components/WelcomeBanner";
import { useAuthStore } from "../../store/auth/authStore";
import MonthlySubscription from "./components/MonthlySubscription";
import SessionSubscription from "./components/SessionSubscription";
import CheckInLogs from "./components/CheckInLogs";
import { useState, useEffect } from "react";
import { useStatsStore } from "../../store/dashboard/useDashboardStore";
import { usePaymentReportStore } from "../../store/payments/paymentReports";
import dayjs from "dayjs";

export default function Dashboard() {
  const { user } = useAuthStore();

  const [monthlyCount, setMonthlyCount] = useState<number>(0);
  const [sessionCount, setSessionCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const { fetchTotalRegistered } = useStatsStore();
  const { report, fetchReport } = usePaymentReportStore();

  useEffect(() => {
    const loadReport = async () => {
      try {
        await fetchReport({
          start_date: dayjs().format("YYYY-MM-DD"),
          end_date: dayjs().format("YYYY-MM-DD"),
        });
      } catch (err) {
        console.error("Failed to load payment report", err);
      }
    };

    loadReport();
  }, [fetchReport]);

  useEffect(() => {
    const loadStats = async () => {
      const all = await fetchTotalRegistered("all");
      const monthly = await fetchTotalRegistered("monthly");
      const session = await fetchTotalRegistered("per_session");

      setTotalCount(all?.totalRegistered ?? 0);
      setMonthlyCount(monthly?.totalRegistered ?? 0);
      setSessionCount(session?.totalRegistered ?? 0);
    };

    loadStats();
  }, [fetchTotalRegistered]);

  return (
    <div
      className="flex flex-col min-h-screen pt-20"
      style={{ backgroundColor: "#f8f8f8" }}
    >
      {/* ───── Header row ───── */}
      <div className="flex flex-row w-full justify-between items-center px-4 mx-auto">
        <WelcomeBanner name={user?.email ?? ""} />
      </div>

      {/* ───── Stats Row ───── */}
      <div className="w-full px-4 mx-auto mt-2 mb-4">
        <div className="row gy-4">
          <div className="col-6 col-md-4 col-lg-3">
            <StatCard
              icon={<VerifiedIcon sx={{ fontSize: 42 }} />}
              label="Total Membership"
              value={totalCount}
            />
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <StatCard
              icon={<AttachMoneyIcon sx={{ fontSize: 42 }} />}
              label="Daily Earned"
              value={report?.summary.total_amount_to_pay.toFixed(2) ?? 0}
            />
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <StatCard
              icon={<EventRepeatIcon sx={{ fontSize: 42 }} />}
              label="Monthly Membership"
              value={monthlyCount}
            />
          </div>
          <div className="col-6 col-md-4 col-lg-3">
            <StatCard
              icon={<PersonIcon sx={{ fontSize: 42 }} />}
              label="Session Membership"
              value={sessionCount}
            />
          </div>
        </div>
      </div>

      {/* ───── Main Content ───── */}
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
