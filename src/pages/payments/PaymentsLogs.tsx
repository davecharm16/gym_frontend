import { Box, Button, CircularProgress, Typography } from "@mui/material";
import PaymentModal from "./components/PaymentModal";
import { useEffect, useState } from "react";
import StatCard from "./components/StatCard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PaymentLogsTable from "./components/PaymentLogsTable";
import Dropdown from "./components/Dropdown";
import DateRangePicker from "./components/DateRangePicker";
import dayjs, { Dayjs } from "dayjs";
import { usePaymentStore } from "../../store/payments/payments";
import { usePaymentReportStore } from "../../store/payments/paymentReports";
import { useTrainingStore } from "../../store/trainings/trainings";
import { useSubscriptionStore } from "../../store/subscriptions/subscriptionsStore";




const paymentOptions = [
  { label: "All", value: "all" },
  { label: "Cash", value: "cash" },
  { label: "Online", value: "online" },
];


const PaymentsLogs = () => {
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState("all");
  const [paymentCategory, setPaymentCategory] = useState("all");
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());


  const { averages, fetchPaymentAverages } = usePaymentStore();
  const { report, fetchReport, loading } = usePaymentReportStore();
  const { trainings, fetchTrainings } = useTrainingStore();
  const { subscriptions, getSubscriptionTypes } = useSubscriptionStore();


  const isToday =
  startDate && endDate &&
  dayjs(startDate).isSame(dayjs(), 'day') &&
  dayjs(endDate).isSame(dayjs(), 'day');

  useEffect(() => {
    fetchTrainings();
    getSubscriptionTypes();
  }, [fetchTrainings, getSubscriptionTypes]);

  const paymentCategories = [
    { label: "All", value: "all" },
    { label: "Misc", value: "misc" },
    ...(subscriptions || []).map((sub) => ({
      label: sub.name,
      value: sub.name.toLowerCase(),
    })),
    ...(trainings || []).map((training) => ({
      label: training.title,
      value: training.title.toLowerCase(),
    })),
  ];

  useEffect(() => {
    const loadReport = async () => {
      try {
        await fetchReport({
          start_date: startDate?.format("YYYY-MM-DD"),
          end_date: endDate?.format("YYYY-MM-DD"),
          payment_type: paymentCategory,
          payment_method: paymentType,
        });
      } catch (err) {
        console.error("Failed to load payment report", err);
      }
    };
  
    loadReport();
  }, [startDate, endDate, paymentCategory, paymentType, fetchReport]);


  const todayOrRangeTotal = report?.summary?.total_amount ?? 0;
  

  useEffect(() => {
    fetchPaymentAverages();
  }, [fetchPaymentAverages]);

  // ───── Dummy Data ─────
  // const dailyTotal = 1200;

  // const dailyGrowth = 2.15;
  // const weeklyGrowth = -1.8;
  // const monthlyGrowth = 4.75;

  return (
    <div className="mt-12 flex flex-col px-12 pt-12">
      <h1 className="text-sm font-extrabold pb-8">Payment Logs</h1>
      {/* ───── Filters Left / Button Right ───── */}
      <div className="flex justify-between flex-wrap gap-4 items-center mb-6">
        <Box display="flex" flexWrap="wrap" gap={2} alignItems="flex-end">
          <Box>
            <Typography variant="h6" gutterBottom>
              Filter by Date Range
            </Typography>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              enforceBidirectionalConstraint
            />
          </Box>

          <Box minWidth={200}>
            <Dropdown
              label="Payment Type"
              value={paymentType}
              onChange={setPaymentType}
              options={paymentOptions}
            />
          </Box>

          <Box minWidth={200}>
            <Dropdown
              label="Payment Category"
              value={paymentCategory}
              onChange={setPaymentCategory}
              options={paymentCategories}
            />
          </Box>
        </Box>
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
            label={isToday ? "Today's Payment" : "Date Range Payments"}
            value={`₱${todayOrRangeTotal.toFixed(2)}`}
            // percentage={dailyGrowth}
          />
        </div>
        <div className="col-12 col-md-4">
          <StatCard
            icon={<EventRepeatIcon sx={{ fontSize: 36 }} />}
            label="Average Weekly Payment"
            value={`₱${averages?.averagePerWeek.toLocaleString()}`}
            // percentage={weeklyGrowth}
          />
        </div>
        <div className="col-12 col-md-4">
          <StatCard
            icon={<DateRangeIcon sx={{ fontSize: 36 }} />}
            label="Average Monthly Payment"
            value={`₱${averages?.averagePerMonth.toLocaleString()}`}
            // percentage={monthlyGrowth}
          />
        </div>
      </div>
      {/* ───── Payment Table ───── */}
      {!loading ? 
      <PaymentLogsTable data={report?.records ?? []} summary={report?.summary}  /> 
      :
      <CircularProgress/>
      }

      {/* ───── Modal ───── */}
      <PaymentModal
        open={openPaymentModal}
        onClose={() => setOpenPaymentModal(false)}
      />
    </div>
  );
};

export default PaymentsLogs;
