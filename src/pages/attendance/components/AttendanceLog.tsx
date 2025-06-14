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
  Paper,
  TablePagination,
  TextField,
  MenuItem,
  Stack,
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
  type: i % 2 === 0 ? "Monthly" : "Weekly",
  date: "07/06/2025",
  time: "11:55 AM",
  avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
}));

const AttendanceTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter((row) => {
    const matchesSearch = row.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || row.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <Paper sx={{ borderRadius: 0, p: 2, boxShadow: "none", border: "none" }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
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
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Member Name</strong>
              </TableCell>
              <TableCell>
                <strong>Address</strong>
              </TableCell>
              <TableCell>
                <strong>Age</strong>
              </TableCell>
              <TableCell>
                <strong>Type</strong>
              </TableCell>
              <TableCell>
                <strong>Subscription Date</strong>
              </TableCell>
              <TableCell>
                <strong>Time</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => (
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
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.time}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AttendanceTable;
