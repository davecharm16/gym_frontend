import { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSubscriptionStore } from "../../../store/subscriptions/subscriptionsStore";
import type { SubscriptionType } from "../../../types/subscription";

interface SessionTableProps {
  data: SubscriptionType[];
}

export default function Session({ data }: SessionTableProps) {
  const [name, setName] = useState("");
  const [fee, setFee] = useState("");
  const [id, setId] = useState("");

  const { editSubscription } = useSubscriptionStore();

  const handleEdit = async () => {
    if (!id || !name || !fee) return;

    try {
      await editSubscription({ name, fee: parseFloat(fee) }, id);
      toast.success("Successfully Updated");
      setId("");
      setName("");
      setFee("");
    } catch (error) {
      console.error(error);
      toast.error("Error Updating, Try Again Later");
    }
  };

  return (
    <div className="mx-auto p-4">
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Edit Subscription
      </Typography>

      {/* Form */}
      <Stack direction="column" spacing={3} mb={6} sx={{ maxWidth: 530 }}>
        <TextField
          label="Subscription Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          size="medium"
          disabled
          sx={{
            "& .MuiInputBase-root": {
              height: 50,
              fontSize: "16px",
              backgroundColor: "#FAFAFA",
            },
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
            "& .MuiInputBase-root": {
              height: 50,
              fontSize: "16px",
              backgroundColor: "#FAFAFA",
            },
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
            borderColor: "#3C3D37",
            "&:hover": {
              backgroundColor: "#181C14",
              borderColor: "#1a1a1a",
            },
          }}
        >
          Save
        </Button>
      </Stack>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid #e0e0e0", borderRadius: 2, mt: 2 }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#F4F4F4" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: 14 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 14 }}>Fee</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 14 }}>
                Date Added
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, fontSize: 14 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.length > 0 ? (
              data.map((s, index) => (
                <TableRow key={index} hover>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>₱{Number(s.amount ?? 0).toFixed(2)}</TableCell>
                  <TableCell>
                    {s.createdAt
                      ? dayjs(s.createdAt).format("MMM DD, YYYY")
                      : "N/A"}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setName(s.name);
                        setId(s.id);
                        setFee(
                          s.amount !== undefined && s.amount !== null
                            ? String(s.amount)
                            : ""
                        );
                      }}
                      sx={{
                        color: "#3C3D37",
                        "&:hover": {
                          backgroundColor: "#E6E6E6",
                        },
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No subscription types available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
