import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  IconButton,
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

type SessionType = {
  name: string;
  fee: number;
  dateAdded: string;
};

interface SessionTableProps {
  data: SubscriptionType[];
}

export default function Session({data} : SessionTableProps) {

  const [name, setName] = useState("");
  const [fee, setFee] = useState("");
  const [sessions, setSessions] = useState<SessionType[]>([]); 
  const {createSubscription} = useSubscriptionStore();


  const handleSave = async () => {
    if (!name || !fee) return;

    const today = new Date().toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const data = await createSubscription({name,fee: parseInt(fee)})

    setSessions([...sessions, { name, fee: parseFloat(fee), dateAdded: today }]);
    setName("");
    console.log(data);
    setFee("");
  };

  const handleDelete = (index: number) => {
    setSessions(sessions.filter((_, i) => i !== index));
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
              <TableCell
                align="center"
                sx={{ fontWeight: 700, fontSize: 14 }}
              >
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
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleDelete(index)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
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
