import { useEffect } from "react";
import { Avatar, TextField, CircularProgress, Alert } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { useProfileStore } from "../../store/profile/profileStore";
import { differenceInCalendarDays, isPast } from "date-fns";

export default function StudentDashboard() {
  const { fetchProfile, profile, loading, error } = useProfileStore();

  useEffect(() => {
    fetchProfile().catch(() => {
      // already handled in store; no need to do anything here
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  if (!profile || profile.role !== "student") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert severity="warning">Student profile not found or unauthorized.</Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl bg-white rounded-sm border-1 border-gray-300 p-10 space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-6">
          <Avatar src="/avatar-default.png" sx={{ width: 82, height: 82 }} />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {profile.firstName} {profile.middleName || ""} {profile.lastName}
            </h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <FieldRow label="First Name" defaultValue={profile.firstName} />
          <FieldRow label="Middle Name" defaultValue={profile.middleName || "-"} />
          <FieldRow label="Last Name" defaultValue={profile.lastName} />
          <FieldRow
            label="Address"
            defaultValue={profile.address || "-"}
            className="sm:col-span-2 md:col-span-3"
          />
          <FieldRow label="Email" defaultValue={profile.email} />
          <FieldRow
            label="Subscription Type"
            defaultValue={profile.subscriptionName || "-"}
          />
          <FieldRow
            label="Due Date"
            defaultValue={
              profile.paidUntil
                ? new Date(profile.paidUntil).toLocaleDateString()
                : "-"
            }
          />
        </div>

        {/* Info Note */}
        {profile.subscriptionName !== "per_session" && profile.paidUntil && (() => {
          const today = new Date();
          const paidUntilDate = new Date(profile.paidUntil);
          const isOverdue = isPast(paidUntilDate);
          const daysDiff = differenceInCalendarDays(paidUntilDate, today);

          let colorClasses = "";
          if (isOverdue) {
            colorClasses = "bg-red-50 border-red-500 text-red-600";
          } else if (daysDiff <= 5) {
            colorClasses = "bg-orange-50 border-orange-500 text-orange-600";
          } else {
            colorClasses = "bg-green-50 border-green-500 text-green-600";
          }

          return (
            <div className={`flex items-start gap-3 border-2 rounded-lg p-4 ${colorClasses}`}>
              <InfoOutlined className={`${isOverdue ? "text-red-500" : daysDiff <=5 ? "text-orange-500" : "text-green-500"} mt-1`} />
              <p className="text-sm">
                <strong>Note:</strong>{" "}
                {isOverdue
                  ? `Your subscription expired ${Math.abs(daysDiff)} day(s) ago on ${paidUntilDate.toLocaleDateString()}. Please renew to restore access to the gym.`
                  : `Your subscription will expire in ${daysDiff} day(s) on ${paidUntilDate.toLocaleDateString()}. Please renew before the due date to avoid service interruption.`}
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

interface FieldRowProps {
  label: string;
  defaultValue: string;
  className?: string;
}

function FieldRow({ label, defaultValue, className = "" }: FieldRowProps) {
  return (
    <div className={className}>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        label={label}
        value={defaultValue}
        disabled
      />
    </div>
  );
}
