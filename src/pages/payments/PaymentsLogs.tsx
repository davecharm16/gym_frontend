import { Button, MenuItem, TextField } from "@mui/material";
import PaymentModal from "./components/PaymentModal";
import { useState } from "react";
import StatCard from "./components/StatCard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PaymentLogsTable from "./components/PaymentLogsTable"; // ✅ Import your table

const PaymentsLogs = () => {
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [dateRange, setDateRange] = useState("daily");
  const [paymentType, setPaymentType] = useState("all");

  // ───── Dummy Data ─────
  const dailyTotal = 1200;
  const weeklyTotal = 7500;
  const monthlyTotal = 30200;

  const dailyGrowth = 2.15;
  const weeklyGrowth = -1.8;
  const monthlyGrowth = 4.75;

  return (
    <div className="mt-12 flex flex-col px-12 pt-12">
      <h1 className="text-sm font-extrabold pb-8">Payment Logs</h1>
      {/* ───── Filters Left / Button Right ───── */}
      <div className="flex justify-between flex-wrap gap-4 items-center mb-6">
        <div className="flex gap-4 flex-wrap">
          <TextField
            select
            label="Date Range"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            size="medium"
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
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </TextField>

          <TextField
            select
            label="Payment Type"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            size="medium"
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
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="session">Session</MenuItem>
          </TextField>
        </div>

        <Button
          variant="outlined"
          onClick={() => setOpenPaymentModal(true)}
          sx={{
            height: 50,
            fontSize: "16px",
            width: 160,
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
      {/* ───── Stat Cards ───── */}
      <div className="row gy-4 mb-6">
        <div className="col-12 col-md-4">
          <StatCard
            icon={<CalendarTodayIcon sx={{ fontSize: 36 }} />}
            label="Daily Payment"
            value={`₱${dailyTotal.toLocaleString()}`}
            percentage={dailyGrowth}
          />
        </div>
        <div className="col-12 col-md-4">
          <StatCard
            icon={<EventRepeatIcon sx={{ fontSize: 36 }} />}
            label="Weekly Payment"
            value={`₱${weeklyTotal.toLocaleString()}`}
            percentage={weeklyGrowth}
          />
        </div>
        <div className="col-12 col-md-4">
          <StatCard
            icon={<DateRangeIcon sx={{ fontSize: 36 }} />}
            label="Monthly Payment"
            value={`₱${monthlyTotal.toLocaleString()}`}
            percentage={monthlyGrowth}
          />
        </div>
      </div>
      {/* ───── Payment Table ───── */}
      <PaymentLogsTable /> {/* ✅ Inserted here */}
      {/* ───── Modal ───── */}
      <PaymentModal
        open={openPaymentModal}
        onClose={() => setOpenPaymentModal(false)}
      />
    </div>
  );
};

export default PaymentsLogs;
