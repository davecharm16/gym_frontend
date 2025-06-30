// src/components/DeleteModal.tsx
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
};

const DeleteModal: React.FC<Props> = ({ open, onClose, onConfirm, name }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ textAlign: "center", px: 6, py: 4 }}>
        <Box mb={2}>
          <DeleteOutlineIcon sx={{ fontSize: 48, color: "#3C3D37" }} />
        </Box>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Are you sure?
        </Typography>
        <Typography>
          Do you want to delete <strong>{name}</strong>?
        </Typography>
        <Typography color="error" sx={{ mt: 1 }}>
          This record cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            minWidth: 120,
            borderColor: "#3C3D37",
            color: "#3C3D37",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#f0f0f0",
              borderColor: "#3C3D37",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            minWidth: 120,
            backgroundColor: "#3C3D37",
            color: "#fff",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#181C14",
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
