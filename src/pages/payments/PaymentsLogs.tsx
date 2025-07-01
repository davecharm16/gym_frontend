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
    startDate &&
    endDate &&
    dayjs(startDate).isSame(dayjs(), "day") &&
    dayjs(endDate).isSame(dayjs(), "day");

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

  const todayOrRangeTotal = report?.summary?.total_amount_to_pay ?? 0;

  useEffect(() => {
    fetchPaymentAverages();
  }, [fetchPaymentAverages]);

  const refetchReport = async () => {
    try {
      await fetchReport({
        start_date: startDate?.format("YYYY-MM-DD"),
        end_date: endDate?.format("YYYY-MM-DD"),
        payment_type: paymentCategory,
        payment_method: paymentType,
      });
      fetchPaymentAverages(); // refresh stat cards too
    } catch (err) {
      console.error("Failed to load payment report", err);
    }
  };

  useEffect(() => {
    refetchReport();
  }, [startDate, endDate, paymentCategory, paymentType]);

  return (
    <Box
      sx={{
        backgroundColor: "#fff", // Match dashboard background
        minHeight: "100vh",
        pt: "40px", // adjust if you have a fixed header
      
      }}
    >
      <div className=" flex flex-col px-6  pt-4 ">
        <h2 className="text-sm font-extrabold pb-8">Payment Logs</h2>

        {/* Filters & Button Container */}
        <div className="flex flex-col sm:flex-row justify-between items-end gap-4 w-full mb-4">
          {/* Filters Group */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full lg:w-auto items-end">
            <div className="w-full sm:w-auto">
              <Typography gutterBottom className="mb-3">
                Filter by Date Range
              </Typography>
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                enforceBidirectionalConstraint
              />
            </div>

            <div className="w-full sm:w-[165px]">
              <Dropdown
                label="Payment Type"
                value={paymentType}
                onChange={setPaymentType}
                options={paymentOptions}
              />
            </div>

            <div className="w-full sm:w-[165px]">
              <Dropdown
                label="Payment Category"
                value={paymentCategory}
                onChange={setPaymentCategory}
                options={paymentCategories}
              />
            </div>
          </div>

          {/* Button aligned to bottom */}
          <div className="w-full sm:w-auto mt-2 sm:mt-0">
            <Button
              variant="outlined"
              onClick={() => setOpenPaymentModal(true)}
              sx={{
                fontSize: "12px",
                height: 40,
                width: 130,
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
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <StatCard
            icon={<CalendarTodayIcon sx={{ fontSize: 36 }} />}
            label={isToday ? "Today's Payment" : "Date Range Payments"}
            value={`₱${todayOrRangeTotal.toFixed(2)}`}
          />
          <StatCard
            icon={<EventRepeatIcon sx={{ fontSize: 36 }} />}
            label="Average Weekly Payment"
            value={`₱${averages?.averagePerWeek.toLocaleString()}`}
          />
          <StatCard
            icon={<DateRangeIcon sx={{ fontSize: 36 }} />}
            label="Average Monthly Payment"
            value={`₱${averages?.averagePerMonth.toLocaleString()}`}
          />
        </div>

        {/* Payment Table */}
        {!loading ? (
          <PaymentLogsTable
            data={report?.records ?? []}
            summary={report?.summary}
          />
        ) : (
          <div className="flex justify-center py-6">
            <CircularProgress />
          </div>
        )}

        {/* Modal */}
        <PaymentModal
          open={openPaymentModal}
          onClose={() => setOpenPaymentModal(false)}
          onSuccess={refetchReport}
        />
      </div>
    </Box>
  );
};

export default PaymentsLogs;
