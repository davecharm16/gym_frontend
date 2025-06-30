import { useEffect, useState } from "react";
import { Tabs, Tab, Box, Divider } from "@mui/material";
import Session from "./screens/Session";
import Instructor from "./screens/Instructor";
import Training from "./screens/training";
import { useSubscriptionStore } from "../../store/subscriptions/subscriptionsStore";
import { useInstructorStore } from "../../store/instructor/insctructorStore";

/* --- replace these paths with the real ones --- */

/* --------------------------------------------- */

export default function SystemSettings() {
  const [tab, setTab] = useState<0 | 1 | 2>(0);
  const { getSubscriptionTypes, subscriptions } = useSubscriptionStore();
  const {getInstructorTypes, instructors}  = useInstructorStore();

  const handleChange = (_: React.SyntheticEvent, newValue: 0 | 1 | 2) =>
    setTab(newValue);

  useEffect(() => {
    getSubscriptionTypes();
  }, [getSubscriptionTypes]);

  useEffect(() => {
    getInstructorTypes();
    console.log(instructors)
  }, [getInstructorTypes]);

 
  return (
    <div className="mt-12 flex flex-col  px-4 pt-12">
      <h2 className="text-sm font-extrabold pb-6 fw-6">System Settings</h2>

      {/* Tabs header */}
      <Tabs
        value={tab}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        sx={{ mb: 2 }}
      >
        <Tab label="Subscription" />
        <Tab label="Instructor" />
        <Tab label="Training" />
      </Tabs>

      <Divider sx={{ mb: 3 }} />

      {/* Tab panels */}
      <Box>
        {tab === 0 && <Session data={subscriptions} />}
        {tab === 1 && <Instructor instructors={instructors}/>}
        {tab === 2 && <Training />}
      </Box>
    </div>
  );
}
