// src/pages/ProfileManagement.tsx
import { useState } from "react";
import Monthly from "./screens/Monthly";
import Session from "./screens/Session";
import RegisterModal from "./components/RegisterModal";
import { Stack, TextField, MenuItem, Button } from "@mui/material";
import { useStudentStore } from "../../store/student/studentStore";

const categoryOptions = ["All", "Premium", "Standard", "Free"];

const ProfileManagement = () => {
  // Set default tab to 'session' instead of 'monthly'
  const [activeTab, setActiveTab] = useState<"monthly" | "session">("session");
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const { searchQuery, selectedCategory, setSearchQuery, setSelectedCategory} = useStudentStore();
  

  return (
    <div className="mt-12 flex flex-col min-h-screen px-12 pt-6">
      <h2 className="text-sm font-bold mb-6">Profile Management</h2>

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
            sx={{ width: 200 }} // Set specific width here
          >
            {categoryOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <Button variant="contained" color="primary"  onClick={() => setOpenRegisterModal(true)}>
          Register
        </Button>
      </Stack>

      {activeTab === "session" && <Session />}
      {activeTab === "monthly" && <Monthly />}
      
      <RegisterModal open={openRegisterModal} onClose={() => setOpenRegisterModal(false)} />
    </div>
  );
};

export default ProfileManagement;
