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
  CircularProgress,
} from "@mui/material";
import { useEffect } from "react";
import { useStudentStore } from "../../../store/student/studentStore";

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
  const { students, loading, getStudents } = useStudentStore();

  useEffect(() => {
    getStudents("per_session"); // Fetch on initial render
  }, [getStudents]);

  const sessionStudents = students
    .slice(0, 10); // limit to 10

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Session Subscribers
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer sx={{ border: "1px solid #ddd", borderRadius: 1 }}>
          <Table>
            <TableHead sx={{ bgcolor: "#f0f0f0" }}>
              <TableRow>
                {["Name", "Age", "Subscription Date", "Category"].map((h) => (
                  <TableCell key={h} sx={{ fontWeight: 700 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {sessionStudents.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell>
                    {`${student.first_name} ${student.middle_name ?? ""} ${student.last_name}`}
                  </TableCell>
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
                        fontWeight: 600,
                        px: 1.5,
                        py: 0.5,
                        fontSize: "13px",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
