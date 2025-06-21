import { useState } from "react";
import {
  Typography,
  Stack,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type TrainingRow = {
  name: string;
  fee: number;
  dateAdded: string;
};

export default function Training() {
  const [name, setName] = useState("");
  const [fee, setFee] = useState("");
  const [rows, setRows] = useState<TrainingRow[]>([]);

  const handleSave = () => {
    if (!name || !fee) return;
    const dateAdded = new Date().toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    setRows([...rows, { name, fee: parseFloat(fee), dateAdded }]);
    setName("");
    setFee("");
  };

  const handleDelete = (idx: number) =>
    setRows(rows.filter((_, i) => i !== idx));

  return (
    <div className="mx-auto p-4">
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Add Training
      </Typography>

      {/* --- form --- */}
      <Stack direction="column" spacing={3} sx={{ maxWidth: 530 }} mb={6}>
        <TextField
          label="Training Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          size="medium"
          sx={{
            "& .MuiInputBase-root": { height: 50, fontSize: "16px" },
            "& .MuiInputLabel-root": { fontSize: "16px" },
          }}
        />
        <TextField
          label="Fee"
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          fullWidth
          size="medium"
          sx={{
            "& .MuiInputBase-root": { height: 50, fontSize: "16px" },
            "& .MuiInputLabel-root": { fontSize: "16px" },
          }}
        />
        <Button
          variant="outlined"
          onClick={handleSave}
          sx={{
            height: 50,
            fontSize: "16px",
            width: 120,
            textTransform: "none",
            backgroundColor: "#3C3D37",
            color: "#fff",
            "&:hover": { backgroundColor: "#181C14", borderColor: "#1a1a1a" },
          }}
        >
          Save
        </Button>
      </Stack>

      {/* --- table --- */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Fee</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Date Added</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length ? (
              rows.map((r, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>₱{r.fee.toFixed(2)}</TableCell>
                  <TableCell>{r.dateAdded}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(idx)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No training added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
