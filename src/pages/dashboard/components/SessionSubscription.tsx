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
} from "@mui/material";

type Row = {
  name: string;
  age: number;
  date: string;
  category: "Weight training" | "Crossfit" | "Boxing";
};

const rows: Row[] = [
  { name: "Torres, Nico", age: 26, date: "06/12/2025", category: "Crossfit" },
  {
    name: "Castro, Elaine",
    age: 23,
    date: "06/13/2025",
    category: "Weight training",
  },
  { name: "Rivera, Joel", age: 30, date: "06/14/2025", category: "Boxing" },
  { name: "Chua, Grace", age: 28, date: "06/15/2025", category: "Crossfit" },
  {
    name: "Navarro, Ivan",
    age: 25,
    date: "06/16/2025",
    category: "Weight training",
  },
];

const getBadgeColor = (c: Row["category"]) =>
  c === "Weight training"
    ? "#FFB22C"
    : c === "Crossfit"
    ? "#379777"
    : "#d32f2f";

export default function SessionSubscription() {
  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Session Subscribers
      </Typography>

      <TableContainer
        sx={{ border: "1px solid #ddd", borderRadius: 1 }}
      >
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
            {rows.map((row) => (
              <TableRow key={row.name} hover>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <Chip
                    label={row.category}
                    variant="outlined"
                    size="small"
                    sx={{
                      color: getBadgeColor(row.category),
                      borderColor: getBadgeColor(row.category),
                      fontWeight: 600,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
