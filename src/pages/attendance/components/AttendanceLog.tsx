import {
  Avatar,
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
  Button,
} from "@mui/material";
import { Skeleton } from "@mui/material";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useMemo, useEffect } from "react";
import type { StudentAttendance } from "../../../types/student_attendance";
import { useCsvExport } from "../../../hooks/useCSVExport";

type AttendanceRow = {
  name: string;
  address: string;
  age: number;
  type: string;
  date: string;
  time: string;
  avatarUrl: string;
};

interface AttendanceTableProps {
  searchQuery: string;
  selectedType: string;
  data: StudentAttendance[];
}

type SortKey = keyof AttendanceRow;
type SortOrder = "asc" | "desc";

const AttendanceLog = ({
  searchQuery,
  selectedType,
  data,
}: AttendanceTableProps) => {
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    order: SortOrder;
  }>({
    key: "name",
    order: "asc",
  });

  const rowsPerPage = 15;
  const csvFields = [
    { label: "Member Name", value: "name" },
    { label: "Address", value: "address" },
    { label: "Age", value: "age" },
    { label: "Type", value: "type" },
    { label: "CheckIn Date", value: "date" },
    { label: "Time", value: "time" },
  ] as const;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exportCsv = useCsvExport<AttendanceRow>();

  const rows: AttendanceRow[] = data.map((item) => ({
    name: `${item.student.lastName}, ${item.student.firstName}`,
    address: item.student.address,
    age: item.student.age,
    type: item.student.subscriptionTypeId ? "Monthly" : "Session",
    date: new Date(item.checkinTime).toLocaleDateString(),
    time: new Date(item.checkinTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    avatarUrl: `https://randomuser.me/api/portraits/men/${item.studentId[3]}${item.studentId[4]}.jpg`,
  }));

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch = row.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "All" || row.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [rows, searchQuery, selectedType]);

  const sortedRows = useMemo(() => {
    const arr = [...filteredRows];
    const { key, order } = sortConfig;

    return arr.sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return order === "asc" ? aVal - bVal : bVal - aVal;
      }

      if (key === "date") {
        const aDate = new Date(aVal as string);
        const bDate = new Date(bVal as string);
        return order === "asc"
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      }

      if (key === "time") {
        const aT = Date.parse(`1970/01/01 ${aVal}`);
        const bT = Date.parse(`1970/01/01 ${bVal}`);
        return order === "asc" ? aT - bT : bT - aT;
      }

      return order === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredRows, sortConfig]);

  const paginatedRows = sortedRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const toggleSort = (key: SortKey, order: SortOrder) => {
    setSortConfig({ key, order });
    setPage(1);
  };

  const [delayedLoading, setDelayedLoading] = useState(true);

  const renderSortIcons = (key: SortKey) => (
    <Box display="inline-flex" flexDirection="column" ml={1}>
      <IconButton
        size="small"
        onClick={() => toggleSort(key, "asc")}
        sx={{
          color:
            sortConfig.key === key && sortConfig.order === "asc"
              ? "primary.main"
              : "grey.500",
          p: 0,
        }}
      >
        <ExpandLessIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => toggleSort(key, "desc")}
        sx={{
          color:
            sortConfig.key === key && sortConfig.order === "desc"
              ? "primary.main"
              : "grey.500",
          p: 0,
        }}
      >
        <ExpandMoreIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );

  const headers: { label: string; key: SortKey }[] = [
    { label: "Member Name", key: "name" },
    { label: "Address", key: "address" },
    { label: "Age", key: "age" },
    { label: "Type", key: "type" },
    { label: "CheckIn Date", key: "date" },
    { label: "Time", key: "time" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setDelayedLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Box marginBottom={2}>
        <Button
          variant="outlined"
          onClick={() => exportCsv(paginatedRows, csvFields, "attendance.csv")}
          sx={{
            borderColor: "#3C3D37",
            color: "#3C3D37",
            "&:hover": {
              borderColor: "#181C14",
              backgroundColor: "#f5f5f5",
            },
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Export CSV
        </Button>
      </Box>

      <Box
        width="100%"
        border={1}
        borderColor={"#e0e0e0"}
        overflow="hidden"
        borderRadius={1}
        bgcolor="#fafafa"
      >
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: "#f0f0f0" }}>
              <TableRow>
                {headers.map(({ label, key }) => (
                  <TableCell
                    key={label}
                    sx={{ fontWeight: "bold", fontSize: 14 }}
                  >
                    <Box display="flex" alignItems="center">
                      {label}
                      {renderSortIcons(key)}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {delayedLoading ? (
                [...Array(rowsPerPage)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(6)].map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton variant="text" width="100%" height={24} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : paginatedRows.length ? (
                paginatedRows.map((row, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar
                          src={row.avatarUrl}
                          alt={row.name}
                          sx={{ width: 32, height: 32, fontSize: 14 }}
                        >
                          {row.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </Avatar>
                        <Typography variant="body2">{row.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.type}
                        variant="outlined"
                        sx={{
                          color: row.type === "Monthly" ? "#FFB22C" : "#379777",
                          borderColor:
                            row.type === "Monthly" ? "#FFB22C" : "#379777",
                          fontWeight: 600,
                          fontSize: "14px",
                          px: 1.5,
                          py: 0.5,
                          borderWidth: 1.5,
                          backgroundColor: "transparent",
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.time}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="flex-start" px={2} py={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, p) => setPage(p)}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </Box>
    </>
  );
};

export default AttendanceLog;
