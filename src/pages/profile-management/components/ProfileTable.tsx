import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  CircularProgress,
  Typography,
  Box,
  Pagination,
} from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Category } from "../../../utils/category";
import { useStudentStore } from "../../../store/student/studentStore";

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

  // Pagination logic
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
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      {filteredStudents.length === 0 ? (
        <Typography align="center" mt={4}>
          No students found.
        </Typography>
      ) : (
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: 1,
            width: "100%",
            overflowX: "auto",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: "16px", fontWeight: "700" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px", fontWeight: "700" }}>
                    Address
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px", fontWeight: "700" }}>
                    Age
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px", fontWeight: "700" }}>
                    Category
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px", fontWeight: "700" }}>
                    Subscription Date
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px", fontWeight: "700" }}>
                    Payment Method
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px", fontWeight: "700" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{`${student.first_name} ${student.middle_name} ${student.last_name}`}</TableCell>
                    <TableCell>{student.address}</TableCell>
                    <TableCell>{calculateAge(student.birthdate)}</TableCell>
                    <TableCell>
                      <Chip
                        label={student.subscription_type_name ?? "N/A"}
                        color={Category(
                          student.subscription_type_name ?? "default"
                        )}
                        size="small"
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
                      <IconButton color="primary">
                        <Visibility />
                      </IconButton>
                      <IconButton color="secondary">
                        <Edit />
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

          {/* Pagination Controls */}
          <Box display="flex" justifyContent="flex-start" my={2} px={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
