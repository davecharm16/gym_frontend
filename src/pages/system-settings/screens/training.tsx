import { useEffect, useState } from "react";
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
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useTrainingStore } from "../../../store/trainings/trainings";
import { toast } from "react-toastify";

export default function Training() {
  const [title, setName] = useState("");
  const [fee, setFee] = useState("");
  const [id, setId] = useState("");

  const { trainings, getTrainings, editTraining } = useTrainingStore();

  useEffect(() => {
    getTrainings();
  }, [getTrainings]);

  const handleEdit = async () => {
    if (!id || !title || !fee) return;

    try {
      await editTraining(
        {
          title: title,
          fee: parseFloat(fee),
        },
        id
      );
      toast.success("Training updated successfully");

      // Clear form
      setName("");
      setFee("");
      setId("");

      // Refresh data
      getTrainings();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update training. Try again later.");
    }
  };

  return (
    <div className="mx-auto p-4">
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Edit Training
      </Typography>

      {/* Form Section */}
      <Stack direction="column" spacing={3} mb={6} sx={{ maxWidth: 530 }}>
        <TextField
          label="Training Name"
          value={title}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter training name"
          fullWidth
          size="medium"
          sx={{
            "& .MuiInputBase-root": { height: 50, fontSize: "16px" },
            "& .MuiInputLabel-root": { fontSize: "16px" },
          }}
          disabled
        />

        <TextField
          label="Fee"
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          placeholder="Enter fee"
          fullWidth
          size="medium"
          sx={{
            "& .MuiInputBase-root": { height: 50, fontSize: "16px" },
            "& .MuiInputLabel-root": { fontSize: "16px" },
          }}
        />

        <Button
          variant="outlined"
          onClick={handleEdit}
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

      {/* Table Section */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid #e0e0e0", borderRadius: 2, mt: 2 }}
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
            {trainings?.length > 0 ? (
              trainings.map((training, index) => (
                <TableRow key={index} hover>
                  <TableCell>{training.title}</TableCell>
                  <TableCell>₱{training.baseFee.toFixed(2)}</TableCell>
                  <TableCell>
                    {training.createdAt.format("MMM DD, YYYY")}
                  </TableCell>
                  <TableCell align="center">
                    <Edit
                      onClick={() => {
                        setName(training.title);
                        setFee(String(training.baseFee));
                        setId(training.id);
                      }}
                      style={{ cursor: "pointer" }}
                    />
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
