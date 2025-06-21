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

type InstructorRow = {
  instructor: string;
  training: string;
  dateAdded: string;
};

export default function Instructor() {
  const [instructor, setInstructor] = useState("");
  const [training, setTraining] = useState("");
  const [rows, setRows] = useState<InstructorRow[]>([]);

  const handleSave = () => {
    if (!instructor || !training) return;
    const dateAdded = new Date().toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    setRows([...rows, { instructor, training, dateAdded }]);
    setInstructor("");
    setTraining("");
  };

  const handleDelete = (idx: number) =>
    setRows(rows.filter((_, i) => i !== idx));

  return (
    <div className="mx-auto p-4">
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Add Instructor
      </Typography>

      {/* --- form --- */}
      <Stack direction="column" spacing={3} sx={{ maxWidth: 530 }} mb={6}>
        <TextField
          label="Instructor Name"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          fullWidth
          size="medium"
          sx={{
            "& .MuiInputBase-root": { height: 50, fontSize: "16px" },
            "& .MuiInputLabel-root": { fontSize: "16px" },
          }}
        />
        <TextField
          label="Training"
          value={training}
          onChange={(e) => setTraining(e.target.value)}
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
              <TableCell sx={{ fontWeight: 700 }}>Instructor</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Training</TableCell>
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
                  <TableCell>{r.instructor}</TableCell>
                  <TableCell>{r.training}</TableCell>
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
                  No instructor added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
