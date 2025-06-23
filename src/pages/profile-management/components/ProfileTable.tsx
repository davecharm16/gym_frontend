import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Pagination,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { Visibility, Delete } from "@mui/icons-material";

import { useStudentStore } from "../../../store/student/studentStore";
import ViewModal, { type StudentData } from "./ViewModal";

export default function ProfileTable() {
  const {
    students,
    getStudents,
    loading,
    error,
    searchQuery,
    selectedCategory,
  } = useStudentStore();

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(
    null
  );

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const calculateAge = (birthdate: string): number => {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const filteredStudents = students.filter((student) => {
    const fullName =
      `${student.first_name} ${student.middle_name} ${student.last_name}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery?.toLowerCase() ?? "");
    const matchesCategory =
      selectedCategory === "All" ||
      student.subscription_type_name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const paginatedStudents = filteredStudents.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Box
      width="100%"
      border={1}
      borderColor="#e0e0e0"
      overflow="hidden"
      borderRadius={1}
      bgcolor="#fafafa"
    >
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead sx={{ bgcolor: "#f0f0f0" }}>
            <TableRow>
              {[
                "Name",
                "Address",
                "Age",
                "Category",
                "Subscription Date",
                "Payment Method",
                "Action",
              ].map((label, index) => (
                <TableCell
                  key={index}
                  sx={{ fontWeight: "bold", fontSize: 14 }}
                >
                  <Box display="flex" alignItems="center">
                    {label}
                    <Box display="inline-flex" flexDirection="column" ml={1}>
                      <ExpandLessIcon
                        sx={{ fontSize: 16, color: "grey.500" }}
                      />
                      <ExpandMoreIcon
                        sx={{ fontSize: 16, color: "grey.500" }}
                      />
                    </Box>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedStudents.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell>
                  <Typography variant="body2">
                    {`${student.first_name} ${student.middle_name} ${student.last_name}`}
                  </Typography>
                </TableCell>
                <TableCell>{student.address}</TableCell>
                <TableCell>{calculateAge(student.birthdate)}</TableCell>
                <TableCell>
                  <Chip
                    label={student.subscription_type_name ?? "N/A"}
                    variant="outlined"
                    sx={{
                      color:
                        student.subscription_type_name === "Monthly"
                          ? "#FFB22C"
                          : "#379777",
                      borderColor:
                        student.subscription_type_name === "Monthly"
                          ? "#FFB22C"
                          : "#379777",
                      fontWeight: 600,
                      fontSize: "14px",
                      px: 1.5,
                      py: 0.5,
                      borderWidth: 1.5,
                      backgroundColor: "transparent",
                    }}
                  />
                </TableCell>
                <TableCell>
                  {student.enrollment_date
                    ? new Date(student.enrollment_date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {student.subscription_fee ? "Paid" : "N/A"}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedStudent({
                        first_name: student.first_name,
                        middle_name: student.middle_name,
                        last_name: student.last_name,
                        address: student.address,
                        birthdate: student.birthdate,
                        subscription_type_name:
                          student.subscription_type_name ?? "",
                        training_category: student.training_category ?? "",
                        due_date: student.due_date ?? "",
                        age: calculateAge(student.birthdate),
                      });
                      setOpenViewModal(true);
                    }}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-start" px={2} py={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Box>

      <ViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        student={selectedStudent}
      />
    </Box>
  );
}
