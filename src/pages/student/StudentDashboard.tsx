// pages/StudentDashboard.tsx
import { useState } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import CheckInModal from "./CheckInModal";
import { InfoOutlined } from "@mui/icons-material";
import { useStudentStore } from "../../store/student/studentStore";
import { useToastStore } from "../../store/toastStore";

export default function StudentDashboard() {
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const { checkInStudent, } = useStudentStore();
  const { showToast } = useToastStore();


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

  const handleCheckIn = async () => {
    const now = new Date();
    const date = now;
    const time = now;

    console.log("Checked in:", {
      email: student.email,
      date,
      time,
    });

    try {
      const res = await checkInStudent({
        email: 'davecharm.official@gmail.com',
        date,
        time,
      });
      if(res?.success === true) {
        showToast("Check-in successful!", "success");
      }
      else{
        showToast("Check-in failed. " + res?.message, "error");
      }
    } catch (error) {
      console.error("Check-in failed:", error);
      // Optionally, you can show an error message to the user
      showToast(
        "Check-in failed. " + error + " Please try again.",
        "error"
      );
    }
   

    setOpenCheckIn(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center mt-20 px-4">
      <h1 className="text-xl font-bold self-start mb-6">
        Personal Information
      </h1>

      <div className="bg-white border rounded-xl w-full max-w-3xl p-8 flex flex-col gap-8">
        <div className="flex items-center gap-5">
          <Avatar src={student.avatarUrl} sx={{ width: 82, height: 82 }} />
          <h2 className="text-3xl font-bold">
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

          <div className="border border-gray-300 rounded-md p-4 bg-white flex items-start gap-3">
            <InfoOutlined className="text-blue-500 mt-0.5" />
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Your subscription will expire soon. Please
              ensure to renew before the due date to continue accessing all
              services without interruption.
            </p>
          </div>
        </div>
      </div>

      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 6,
          maxWidth: "48rem",
          backgroundColor: "#414545",
          textTransform: "none",
          fontSize: "1rem",
          py: 1.5,
          "&:hover": { backgroundColor: "#333" },
        }}
        onClick={() => setOpenCheckIn(true)}
      >
        Check In
      </Button>

      {/* Modal Component */}
      <CheckInModal
        open={openCheckIn}
        onClose={() => setOpenCheckIn(false)}
        onConfirm={handleCheckIn}
        email={student.email}
      />
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
