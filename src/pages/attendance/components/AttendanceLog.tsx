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
  TextField,
  MenuItem,
  Chip,
  Pagination,
} from "@mui/material";
import { useState } from "react";

type AttendanceRow = {
  name: string;
  address: string;
  age: number;
  type: string;
  date: string;
  time: string;
  avatarUrl: string;
};

// Sample data
const rows: AttendanceRow[] = Array.from({ length: 25 }).map((_, i) => ({
  name: "Dela Cruz, Juan A.",
  address: "Malabago, Mangaldan, Pangasinan",
  age: 18,
  type: i % 2 === 0 ? "Monthly" : "Session",
  date: "07/06/2025",
  time: "11:55 AM",
  avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
}));

const rowsPerPage = 5;

const AttendanceTable = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const filteredRows = rows.filter((row) => {
    const matchesSearch = row.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || row.type === selectedType;
    return matchesSearch && matchesType;
  });

  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 1,
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Box
          p={2}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
        >
          <TextField
            label="Search Name"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <TextField
            label="Filter by Type"
            variant="outlined"
            size="small"
            select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Session">Session</MenuItem>
          </TextField>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  Member Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  Address
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  Age
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  Type
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  Subscription Date
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "14px" }}>
                  Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar
                        src={row.avatarUrl}
                        sx={{ width: 32, height: 32 }}
                      />
                      <Typography variant="body2">{row.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.type}
                      color={row.type === "Monthly" ? "primary" : "secondary"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.time}</TableCell>
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
      </Box>
    </Box>
  );
};

export default AttendanceTable;
