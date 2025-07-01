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
} from "@mui/material";
import type { SubscriptionType } from "../../../types/subscription";
import { useSubscriptionStore } from "../../../store/subscriptions/subscriptionsStore";
import { Edit } from "@mui/icons-material";
import { toast } from "react-toastify";


interface SessionTableProps {
  data: SubscriptionType[];
}

export default function Session({ data }: SessionTableProps) {
  const [name, setName] = useState("");
  const [fee, setFee] = useState("");
  const [id, setId] = useState("");
  const { editSubscription } = useSubscriptionStore();


  const handleEdit = async () => {
    if(id === "" || name ==="" || fee ==="") return;

    try {
      await editSubscription({
        name: name,
        fee: parseInt(fee),
      }, id)
      toast.success('Successfully Updated')
    } catch (error) {
      console.log(error);
      toast.error('Error Updating, Try Again Later')
    }
  };

  return (
    <div className="mx-auto p-4">
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Add Session Subscription
      </Typography>

      {/* Form Section */}
      <Stack direction="column" spacing={3} mb={6} sx={{ maxWidth: 530 }}>
        <TextField
          label="Subscription Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter session name"
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
                  <TableCell>₱{s.amount?.toFixed(2)}</TableCell>
                  <TableCell>{s.createdAt}</TableCell>
                  <TableCell>
                    <Edit
                      onClick={() => {
                        setName(s.name);
                        setId(s.id)
                        setFee(
                          s.amount !== undefined && s.amount !== null
                            ? String(s.amount)
                            : ""
                        );
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No session subscriptions added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
