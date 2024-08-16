import React from "react";
import { Snackbar } from "@mui/material";
import { Slide } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export default function NotificationSnackbar({ open, handleClose, content }) {
  const closeButton = (
    <React.Fragment>
      <IconButton onClick={handleClose} size="small" color="#ffffff">
        <CloseIcon color="primary" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      message={content}
      onClose={handleClose}
      action={closeButton}
      TransitionComponent={Slide}
    />
  );
}
