import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

function ConfirmationDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Aanvraag succesvol</DialogTitle>
      <DialogContent>
        <p>
          Uw aanvraag is verstuurd. De gegevens zullen worden geüpdatet wanneer
          de admin dit goedkeurt.
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
