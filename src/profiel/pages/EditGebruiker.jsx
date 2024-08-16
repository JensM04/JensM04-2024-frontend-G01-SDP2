import React, { useState, useEffect } from "react";
import { Typography, Grid, Button, Box, TextField, Modal } from "@mui/material";

function EditGebruiker({
  user,
  openModal,
  handleCloseModal,
  handleSaveChanges,
}) {
  const [editedUser, setEditedUser] = useState({
    gebruikersnaam: user.GEBRUIKERSNAAM,
    email: user.EMAIL,
    wachtwoord: "",
    confirmWachtwoord: "",
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [passwordNumberError, setPasswordNumberError] = useState(false);

  useEffect(() => {
    setEditedUser({
      gebruikersnaam: user.GEBRUIKERSNAAM,
      email: user.EMAIL,
      wachtwoord: "",
      confirmWachtwoord: "",
    });
  }, [user]);

  const handleChange = (field, value) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));

    if (field === "wachtwoord" || field === "confirmWachtwoord") {
      const wachtwoord = field === "wachtwoord" ? value : editedUser.wachtwoord;
      const confirmWachtwoord =
        field === "confirmWachtwoord" ? value : editedUser.confirmWachtwoord;

      setPasswordMatchError(wachtwoord !== confirmWachtwoord);
      setPasswordLengthError(wachtwoord.length < 6);
      setPasswordNumberError(!/\d/.test(wachtwoord));
    }
  };

  const handleSave = () => {
    if (passwordMatchError || passwordLengthError || passwordNumberError) {
      return;
    }

    handleSaveChanges(editedUser);
    handleCloseModal();
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          minWidth: 400,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          color="primary"
        >
          Pas gegevens aan
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Gebruikersnaam"
              value={editedUser.gebruikersnaam}
              fullWidth
              margin="normal"
              onChange={(e) => handleChange("gebruikersnaam", e.target.value)}
            />
            <TextField
              label="Email"
              value={editedUser.email}
              fullWidth
              margin="normal"
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <TextField
              type="password"
              label="Wachtwoord"
              value={editedUser.wachtwoord}
              fullWidth
              margin="normal"
              onChange={(e) => handleChange("wachtwoord", e.target.value)}
              error={passwordLengthError || passwordNumberError}
              helperText={
                passwordLengthError
                  ? "Wachtwoord moet minimaal 6 tekens lang zijn"
                  : passwordNumberError
                  ? "Wachtwoord moet minstens één cijfer bevatten"
                  : ""
              }
            />
            <TextField
              type="password"
              label="Bevestig Wachtwoord"
              value={editedUser.confirmWachtwoord}
              fullWidth
              margin="normal"
              onChange={(e) =>
                handleChange("confirmWachtwoord", e.target.value)
              }
              error={passwordMatchError}
              helperText={
                passwordMatchError ? "Wachtwoorden komen niet overeen" : ""
              }
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 2,
          }}
        >
          <Button onClick={handleCloseModal} color="primary" variant="outlined">
            ANNULEER
          </Button>
          <Button
            onClick={handleSave}
            color="primary"
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            OPSLAAN
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditGebruiker;
