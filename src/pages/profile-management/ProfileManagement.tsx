import { useEffect, useState } from "react";
import RegisterModal from "./components/RegisterModal";
import { Stack, TextField, MenuItem, Button, Box } from "@mui/material";
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
    <Box
      sx={{
        backgroundColor: "#f5f5f5", // Match dashboard background
        minHeight: "100vh",
        pt: "80px", // adjust if you have a fixed header
        px: 4,
      }}
    >
      <Box className="flex flex-col px-8 pt-4">
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
             
              label="Search"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                background:"#fff",
                width: 250,
               
                fontSize: "14px",
                "& .MuiInputBase-root": {
             
                  fontSize: "14px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
              }}
              InputProps={{
                endAdornment: <Search sx={{ color: "#757575", ml: 1 }} />,
              }}
            />
            <TextField
              label="Category"
              select
              size="small"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={{
                 background:"#fff",
                width: 150,
               
                fontSize: "14px",
                "& .MuiInputBase-root": {
               
                  fontSize: "14px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
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
             
              fontSize: "14px",
              width: 100,
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
      </Box>
    </Box>
  );
};

export default ProfileManagement;
