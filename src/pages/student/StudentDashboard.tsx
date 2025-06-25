import { useEffect } from "react";
import { Avatar, TextField, CircularProgress, Alert } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { useProfileStore } from "../../store/profile/profileStore";

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
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50">
      <div className="bg-white border rounded-xl w-full max-w-4xl p-8 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center gap-6">
          <Avatar src="/avatar-default.png" sx={{ width: 82, height: 82 }} />
          <div>
            <h2 className="text-3xl font-extrabold leading-tight">
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
        <div className="border-2 border-blue-500 rounded-md p-4 bg-blue-50 flex items-start gap-3 mt-4">
          <InfoOutlined className="text-blue-500 mt-1" />
          <p className="text-sm text-blue-600">
            <strong>Note:</strong> Your subscription will expire soon. Please renew
            before the due date to avoid service interruption.
          </p>
        </div>
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
