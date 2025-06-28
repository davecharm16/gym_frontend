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
import { useStudentStore } from "../../../store/student/studentStore";
import { useEffect, useState } from "react";
import type { Student } from "../../../types/students";

const getBadgeColor = (category: string) =>
  category === "monthly"
    ? "#FFB22C"
    : category === "session"
    ? "#379777"
    : "#d32f2f";

export default function MonthlySubscription() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const { getStudents } = useStudentStore();

  
  useEffect(() => {
    const fetchMonthly = async () => {
      try {
        setLoading(true);
        const res = await getStudents("monthly");
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
    getStudents("monthly");
  }, [getStudents]);

  useEffect(() => {
    const timer = setTimeout(() => setDelayedLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, []);
  const monthlyStudents = students.slice(0, 10);

  const calculateAge = (birthdate: string): number => {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Monthly Subscribers
      </Typography>

      <TableContainer
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          overflow: "hidden",
          height: "345px",
          backgroundColor: "#fff",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Name",
                "Age",
                "Subscription Date",
                "Paid Until",
                "Category",
              ].map((h) => (
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
                    {Array.from({ length: 5 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton variant="text" width="100%" height={20} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : monthlyStudents.length > 0
              ? monthlyStudents.map((student) => {
                  const category = student.subscription_type?.name ?? "N/A";
                  return (
                    <TableRow key={student.id} hover>
                      <TableCell>{`${student.first_name} ${
                        student.middle_name ?? ""
                      } ${student.last_name}`}</TableCell>
                      <TableCell>{calculateAge(student.birthdate)}</TableCell>
                      <TableCell>
                        {new Date(student.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {student.paid_until
                          ? new Date(student.paid_until).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={category}
                          variant="outlined"
                          size="small"
                          sx={{
                            color: getBadgeColor(category),
                            borderColor: getBadgeColor(category),
                            fontWeight: 400,
                            px: 1.5,
                            py: 0.5,
                            fontSize: "12px",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              : // Blank rows when no data
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={`blank-${i}`}>
                    {Array.from({ length: 5 }).map((_, j) => (
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
