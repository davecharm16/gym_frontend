import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Skeleton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useStudentStore } from "../../../store/student/studentStore";
import type { Student } from "../../../types/students";

const getBadgeColor = (type: string) =>
  type.toLowerCase() === "weight training"
    ? "#FFB22C"
    : type.toLowerCase() === "crossfit"
    ? "#379777"
    : "#d32f2f";

const calculateAge = (birthdate: string): number => {
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

export default function SessionSubscription() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const { getStudents } = useStudentStore();

  useEffect(() => {
    
    const fetchMonthly = async () => {
      try {
        setLoading(true);
        const res = await getStudents("per_session");
        setStudents((res ?? []).slice(0, 10)); // limit to 10
      } catch (e) {
        console.error("Failed to fetch students:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthly();
  }, [getStudents]);
  const [delayedLoading, setDelayedLoading] = useState(true);
  useEffect(() => {
    getStudents("per_session");
  }, [getStudents]);

  useEffect(() => {
    const timer = setTimeout(() => setDelayedLoading(false), 1000); // ✅
    return () => clearTimeout(timer);
  }, []);
  const sessionStudents = students.slice(0, 10);

  return (
    <Box sx={{ height: "430px" }}>
      <Typography variant="h6" fontWeight={500} mb={2}>
        Latest Session Subscription
      </Typography>

      <TableContainer
        sx={{
          border: "1px solid #ddd",
          borderRadius: 1,
          backgroundColor: "#fff",
          height: "345px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {["Name", "Age", "Subscription Date", "Category"].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 700, fontSize: 13 }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading || delayedLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton variant="text" width="100%" height={20} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : sessionStudents.length > 0
              ? sessionStudents.map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell>{`${student.first_name} ${
                      student.middle_name ?? ""
                    } ${student.last_name}`}</TableCell>
                    <TableCell>{calculateAge(student.birthdate)}</TableCell>
                    <TableCell>
                      {student.created_at
                        ? new Date(student.created_at).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={student.subscription_type?.name ?? "N/A"}
                        variant="outlined"
                        size="small"
                        sx={{
                          color: getBadgeColor(
                            student.subscription_type?.name ?? ""
                          ),
                          borderColor: getBadgeColor(
                            student.subscription_type?.name ?? ""
                          ),
                          fontWeight: 400,
                          px: 1.5,
                          py: 0.5,
                          fontSize: "12px",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : // Render 5 blank rows when there is no data
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={`blank-${i}`}>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <TableCell key={j}>&nbsp;</TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
