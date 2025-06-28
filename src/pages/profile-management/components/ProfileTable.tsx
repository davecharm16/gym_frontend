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
  Skeleton,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { Visibility, Delete } from "@mui/icons-material";

import { useStudentStore } from "../../../store/student/studentStore";
import ViewModal, { type StudentData } from "./ViewModal";
import DeleteModal from "./DeleteModal";
import { useToastStore } from "../../../store/toastStore";

export default function ProfileTable() {
  const {
    students,
    getStudents,
    loading,

    searchQuery,
    selectedCategory,
    deleteStudent,
  } = useStudentStore();

  const [delayedLoading, setDelayedLoading] = useState(true);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(
    null
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const { showToast } = useToastStore();

  useEffect(() => {
    getStudents();
  }, [getStudents]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (): Promise<void> => {
    if (!selectedToDelete?.id) return;
    try {
      await deleteStudent(selectedToDelete.id);
      setOpenDeleteModal(false);
      setSelectedToDelete(null);
      showToast("Student successfully deleted", "success");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showToast("Something went wrong while deleting", "error");
    }
  };

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
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.first_name} ${student.middle_name || ""} ${
      student.last_name
    }`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery?.toLowerCase() ?? "");
    const matchesCategory =
      selectedCategory === "All" ||
      student.subscription_type?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const paginatedStudents = filteredStudents.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

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
          <TableHead>
            <TableRow>
              {[
                "Name",
                "Address",
                "Age",
                "Category",
                "Date Created",
                "Paid Until",
                "Action",
              ].map((label, idx) => (
                <TableCell key={idx} sx={{ fontWeight: "bold", fontSize: 14 }}>
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
            {loading || delayedLoading
              ? Array.from({ length: 10 }).map((_, idx) => (
                  <TableRow key={idx}>
                    {Array.from({ length: 7 }).map((__, cellIdx) => (
                      <TableCell key={cellIdx}>
                        <Skeleton variant="text" height={28} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : paginatedStudents.map((student) => {
                  const isMonthly =
                    student.subscription_type?.name === "monthly";
                  const subscriptionDate = student.created_at;
                  const paymentStatus =
                    isMonthly && student.paid_until ? student.paid_until : "-";

                  return (
                    <TableRow key={student.id} hover>
                      <TableCell>
                        <Typography variant="body2">
                          {`${student.first_name} ${
                            student.middle_name || ""
                          } ${student.last_name}`}
                        </Typography>
                      </TableCell>
                      <TableCell>{student.address}</TableCell>
                      <TableCell>{calculateAge(student.birthdate)}</TableCell>
                      <TableCell>
                        <Chip
                          label={student.subscription_type?.name ?? "N/A"}
                          variant="outlined"
                          sx={{
                            color: isMonthly ? "#FFB22C" : "#379777",
                            borderColor: isMonthly ? "#FFB22C" : "#379777",
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
                        {subscriptionDate
                          ? new Date(subscriptionDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {paymentStatus !== "-"
                          ? new Date(paymentStatus).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            setSelectedStudent({
                              first_name: student.first_name,
                              middle_name: student.middle_name || "",
                              last_name: student.last_name,
                              address: student.address,
                              birthdate: student.birthdate,
                              subscription_type_name:
                                student.subscription_type?.name ?? "",
                              training_category:
                                student.enrollments?.[0]?.training?.title ?? "",
                              due_date: student.paid_until ?? "",
                              age: calculateAge(student.birthdate),
                            });
                            setOpenViewModal(true);
                          }}
                          sx={{ color: "#3C3D37" }}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setSelectedToDelete({
                              id: student.id,
                              name: `${student.first_name} ${student.last_name}`,
                            });
                            setOpenDeleteModal(true);
                          }}
                          sx={{ color: "#3C3D37" }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>

      {!loading && !delayedLoading && (
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
      )}

      <ViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        student={selectedStudent}
      />
      <DeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
        name={selectedToDelete?.name ?? ""}
      />
    </Box>
  );
}
