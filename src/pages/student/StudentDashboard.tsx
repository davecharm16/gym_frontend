import { Avatar, TextField } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

export default function StudentDashboard() {
  const student = {
    avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    firstName: "Juan",
    middleName: "Santos",
    lastName: "Dela Cruz",
    address: "Malabago, Mangaldan, Pangasinan",
    email: "juan@example.com",
    subscription: "Monthly",
    category: "Crossfit",
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white border rounded-xl w-full max-w-3xl p-8 flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Avatar src={student.avatarUrl} sx={{ width: 82, height: 82 }} />
          <h2 className="text-3xl font-extrabold">
            {student.firstName} {student.middleName} {student.lastName}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FieldRow label="Last Name" defaultValue={student.lastName} />
            <FieldRow label="First Name" defaultValue={student.firstName} />
            <FieldRow label="Middle Name" defaultValue={student.middleName} />
          </div>
          <FieldRow label="Address" defaultValue={student.address} />
          <FieldRow label="Email Address" defaultValue={student.email} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldRow
              label="Subscription"
              defaultValue={student.subscription}
            />
            <FieldRow
              label="Date Subscription"
              defaultValue={student.subscription}
            />
          </div>

          <div className="border-2 border-blue-500 rounded-md p-4 bg-blue-50 flex items-start gap-3">
            <InfoOutlined className="text-blue-500 mt-0.5" />
            <p className="text-sm text-blue-500">
              <strong>Note:</strong> Your subscription will expire soon. Please
              ensure to renew before the due date to continue accessing all
              services without interruption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FieldRowProps {
  label: string;
  defaultValue: string;
}

function FieldRow({ label, defaultValue }: FieldRowProps) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      label={label}
      value={defaultValue}
      disabled
    />
  );
}
