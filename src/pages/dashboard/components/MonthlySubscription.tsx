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
  {
    name: "Dela Cruz Juan",
    age: 24,
    date: "06/01/2025",
    category: "Weight training",
  },
  { name: "Reyes, Maria", age: 29, date: "06/03/2025", category: "Crossfit" },
  { name: "Santos, Luis", age: 22, date: "06/05/2025", category: "Boxing" },
  { name: "Garcia, Ana", age: 27, date: "06/08/2025", category: "Crossfit" },
  {
    name: "Lee, Carlo",
    age: 31,
    date: "06/10/2025",
    category: "Weight training",
  },
];

const getBadgeColor = (c: Row["category"]) =>
  c === "Weight training"
    ? "#FFB22C"
    : c === "Crossfit"
    ? "#379777"
    : "#d32f2f";

export default function MonthlySubscription() {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={700} mb={2}>
        Monthly Subscribers
      </Typography>

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
              {["Name", "Age", "Subscription Date", "Category"].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 700, fontSize: 14 }}>
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
    </Box>
  );
}
