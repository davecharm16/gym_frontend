import { useEffect, useState } from "react";
import RegisterModal from "./components/RegisterModal";
import { Stack, TextField, MenuItem, Button, Box } from "@mui/material";
import { useStudentStore } from "../../store/student/studentStore";
import { useSubscriptionStore } from "../../store/subscriptions/subscriptionsStore";

import { Search } from "@mui/icons-material";
import ProfileTable from "@/pages/profile-management/components/ProfileTable";

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
        backgroundColor: "#fff", // Match dashboard background
        minHeight: "100vh",
        pt: "60px", // adjust if you have a fixed header
        px: 3,
      }}
    >
      <Box className="flex flex-col ">
        <h2 className="text-sm font-extrabold pb-8">Profile Management</h2>

        <Stack
          direction="row"
          
          justifyContent="space-between"
          alignItems="flex-start"
          flexWrap="wrap"
          rowGap={2}
          mb={4}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            flex={1}
            sx={{ width: "100%" }}
          >
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              sx={{
                background: "#fff",
                maxWidth: { xs: "100%", sm: 250 },
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
              fullWidth
              sx={{
                background: "#fff",
                maxWidth: { xs: "100%", sm: 150 },
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
            fullWidth={true}
            sx={{
              fontSize: "14px",
              maxWidth: { xs: "100%", sm: 120 },
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
