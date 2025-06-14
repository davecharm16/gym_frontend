// pages/StudentDashboard.tsx
import { useState } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import CheckInModal from "./CheckInModal";

export default function StudentDashboard() {
  const [openCheckIn, setOpenCheckIn] = useState(false);

  const student = {
    avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    fullName: "Juan Dela Cruz",
    email: "juan@example.com",
    phone: "+639171234567",
    street: "",
    apt: "",
    city: "",
    state: "",
  };

  const handleCheckIn = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    console.log("Checked in:", {
      email: student.email,
      date,
      time,
    });

    setOpenCheckIn(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center mt-20 px-4">
      <h1 className="text-xl font-bold self-start mb-6">
        Personal Informations
      </h1>

      <div className="bg-white border rounded-xl w-full max-w-3xl p-8 flex flex-col gap-8">
        <div className="flex items-center gap-5">
          <Avatar
            src={student.avatarUrl}
            alt={student.fullName}
            sx={{ width: 72, height: 72 }}
          />
          <h2 className="text-2xl font-semibold">{student.fullName}</h2>
        </div>

        <div className="flex flex-col gap-4">
          <FieldRow label="Full Name" defaultValue={student.fullName} />
          <FieldRow label="Email" defaultValue={student.email} />
          <FieldRow label="Phone" defaultValue={student.phone} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldRow label="Street Number" defaultValue={student.street} />
            <FieldRow label="Apt / House Number" defaultValue={student.apt} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldRow label="City" defaultValue={student.city} />
            <FieldRow label="State" defaultValue={student.state} />
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
