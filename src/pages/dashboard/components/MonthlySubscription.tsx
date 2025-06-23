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
import { useStudentStore } from "../../../store/student/studentStore";

const getBadgeColor = (category: string) =>
  category === "monthly"
    ? "#FFB22C"
    : category === "session"
    ? "#379777"
    : "#d32f2f";

export default function MonthlySubscription() {
  const { students, loading } = useStudentStore();

  const monthlyStudents = students.filter(
    (student) => student.subscription_type?.name === "monthly"
  );

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

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead sx={{ bgcolor: "#f0f0f0" }}>
              <TableRow>
                {[
                  "Name",
                  "Age",
                  "Subscription Date",
                  "Paid Until",
                  "Category",
                ].map((h) => (
                  <TableCell key={h} sx={{ fontWeight: 700, fontSize: 14 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {monthlyStudents.map((student) => {
                const category = student.subscription_type?.name ?? "N/A";
                return (
                  <TableRow key={student.id} hover>
                    <TableCell>
                      {`${student.first_name} ${student.middle_name ?? ""} ${student.last_name}`}
                    </TableCell>
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
                          fontWeight: 600,
                          px: 1.5,
                          py: 0.5,
                          fontSize: "13px",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
