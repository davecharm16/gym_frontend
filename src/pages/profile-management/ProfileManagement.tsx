import { useEffect, useState } from "react";
import RegisterModal from "./components/RegisterModal";
import { Stack, TextField, MenuItem, Button } from "@mui/material";
import { useStudentStore } from "../../store/student/studentStore";
import { useSubscriptionStore } from "../../store/subscriptions/subscriptionsStore";
import ProfileTable from "./components/ProfileTable";
import { Search } from "@mui/icons-material";

const ProfileManagement = () => {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const { searchQuery, selectedCategory, setSearchQuery, setSelectedCategory } =
    useStudentStore();
  const { subscriptions, getSubscriptionTypes } = useSubscriptionStore();

  useEffect(() => {
    getSubscriptionTypes();
  }, [getSubscriptionTypes]);

  return (
    <div className="mt-12 flex flex-col  px-12 pt-12">
      <h1 className="text-sm font-extrabold pb-8">Profile Management</h1>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Stack direction="row" spacing={2}>
          <TextField
            label="Search by name"
            variant="outlined"
            size="medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            InputProps={{
              endAdornment: <Search sx={{ color: "#757575", ml: 1 }} />,
            }}
          />
          <TextField
            label="Category"
            select
            size="medium"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{
              width: 200,
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
            <MenuItem key="all" value="All">
              All
            </MenuItem>
            {subscriptions.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <Button
          variant="outlined"
          onClick={() => setOpenRegisterModal(true)}
          sx={{
            height: 50,
            fontSize: "16px",
            width: 120,
            textTransform: "none",
            backgroundColor: "#3C3D37",
            color: "#fff",

            "&:hover": {
              backgroundColor: "#181C14",
              borderColor: "#1a1a1a",
            },
          }}
        >
          Register
        </Button>
      </Stack>

      <ProfileTable />

      <RegisterModal
        open={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
      />
    </div>
  );
};

export default ProfileManagement;
