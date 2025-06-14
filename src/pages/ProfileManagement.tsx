// src/pages/ProfileManagement.tsx
import { useState } from "react";
import Monthly from "./profile-management/screens/Monthly";
import Session from "./profile-management/screens/Session";
import RegisterModal from "./profile-management/components/RegisterModal";
import { Stack, TextField, MenuItem, Button } from "@mui/material";
import { useStudentStore } from "../store/student/studentStore";

const categoryOptions = ["All", "Premium", "Standard", "Free"];

const ProfileManagement = () => {
  // Set default tab to 'session' instead of 'monthly'
  const [activeTab, setActiveTab] = useState<"monthly" | "session">("session");
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const { searchQuery, selectedCategory, setSearchQuery, setSelectedCategory } =
    useStudentStore();

  return (
    <div className="p-3 mt-12">
      <h2 className="text-sm font-extrabold mb-6">Profile Management</h2>

      <div className="flex gap-6 border-b pb-2 m-6">
        <button
          className={`pb-1 ${
            activeTab === "session"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("session")}
        >
          Session
        </button>
        <button
          className={`pb-1 ${
            activeTab === "monthly"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("monthly")}
        >
          Monthly
        </button>
      </div>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ mx: "20px" }}
        mb={2}
      >
        <Stack direction="row" spacing={2}>
          <TextField
            label="Search by name"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <TextField
            label="Category"
            select
            size="small"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{ width: 150 }} // Set specific width here
          >
            {categoryOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <Button
          variant="outlined"
          onClick={() => setOpenRegisterModal(true)}
          sx={{
            textTransform: "none",
            border: "1px solid black", // Optional: use your desired color
            color: "#000", // Match border color for text
          }}
        >
          Register
        </Button>
      </Stack>

      {activeTab === "session" && <Session />}
      {activeTab === "monthly" && <Monthly />}

      <RegisterModal
        open={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
      />
    </div>
  );
};

export default ProfileManagement;
