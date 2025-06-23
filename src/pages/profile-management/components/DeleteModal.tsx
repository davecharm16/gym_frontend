// src/components/DeleteModal.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
};

const DeleteModal: React.FC<Props> = ({ open, onClose, onConfirm, name }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Student</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete <strong>{name}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
