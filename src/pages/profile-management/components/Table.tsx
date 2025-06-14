import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Chip,
  CircularProgress,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Category } from "../../../utils/category";
import { useStudentStore } from "../../../store/student/studentStore";

const categoryOptions = ["All", "Premium", "Standard", "Free"];

export default function ProfileTable() {
  const { students, getStudents, loading, error } = useStudentStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    getStudents();
  }, [getStudents]);

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
    const matchesSearch = fullName.includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      student.subscription_type_name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
    <Box>
      {/* Toolbar */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Stack direction="row" spacing={2}>
          <TextField
            label="Search by name"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <TextField
            label="Category"
            select
            size="small"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{ width: 200 }} // Set specific width here
          >
            {categoryOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <Button variant="contained" color="primary">
          Register
        </Button>
      </Stack>

      {/* Table */}
      {filteredStudents.length === 0 ? (
        <Typography align="center" mt={4}>
          No students found.
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Address</strong>
                </TableCell>
                <TableCell>
                  <strong>Age</strong>
                </TableCell>
                <TableCell>
                  <strong>Category</strong>
                </TableCell>
                <TableCell>
                  <strong>Subscription Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Payment Method</strong>
                </TableCell>
                <TableCell>
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow
                  key={student.id}
                  sx={{ borderBottom: "1px solid #e0e0e0" }}
                >
                  <TableCell>
                    {`${student.first_name} ${student.middle_name} ${student.last_name}`}
                  </TableCell>
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
                    <IconButton color="primary" aria-label="view">
                      <Visibility />
                    </IconButton>
                    <IconButton color="secondary" aria-label="edit">
                      <Edit />
                    </IconButton>
                    <IconButton color="error" aria-label="delete">
                      <Delete />
                    </IconButton>
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
