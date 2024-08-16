import { useState } from "react";
import { Typography, Grid, Button, Box, TextField, Modal } from "@mui/material";

function EditBedrijf({ user, openModal, handleCloseModal, handleSaveChanges }) {
  const [editedUser, setEditedUser] = useState({
    email: user.email,
    naam: user.naam,
    sector: user.sector,
    telefoonnummer: user.telefoonnummer,
    website: user.website,
    adres: {
      straat: user.adres.straat,
      huisnummer: user.adres.huisnummer,
      postcode: user.adres.postcode,
      gemeente: user.adres.gemeente,
    },
  });

  const [errors, setErrors] = useState({
    email: false,
    naam: false,
    sector: false,
    telefoonnummer: false,
    website: false,
  });

  const handleChange = (field, value) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: false,
    }));

    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailError = !emailRegex.test(value);

      setErrors((prevErrors) => ({
        ...prevErrors,
        email: emailError,
      }));
    } else if (field === "naam" || field === "sector") {
      const minLength = 4;
      const fieldError = value.length < minLength;

      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: fieldError,
      }));
    } else if (field === "telefoonnummer") {
      const phoneRegex = /^\d{10}$/;
      const phoneError = !phoneRegex.test(value);

      setErrors((prevErrors) => ({
        ...prevErrors,
        telefoonnummer: phoneError,
      }));
    } else if (field === "website") {
      const websiteRegex = /^(http|https):\/\/[^ "]+$/;
      const websiteError = !websiteRegex.test(value);

      setErrors((prevErrors) => ({
        ...prevErrors,
        website: websiteError,
      }));
    }
  };

  const handleAddressChange = (field, value) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      adres: {
        ...prevUser.adres,
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    if (Object.values(errors).some((error) => error)) {
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Email"
                value={editedUser.email}
                fullWidth
                margin="normal"
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
                helperText={errors.email && "Ongeldig emailadres"}
              />
              <TextField
                label="Bedrijfsnaam"
                value={editedUser.naam}
                fullWidth
                margin="normal"
                onChange={(e) => handleChange("naam", e.target.value)}
                error={errors.naam}
                helperText={
                  errors.naam && "Bedrijfsnaam moet minimaal 4 tekens zijn"
                }
              />
              <TextField
                label="Sector"
                value={editedUser.sector}
                fullWidth
                margin="normal"
                onChange={(e) => handleChange("sector", e.target.value)}
                error={errors.sector}
                helperText={
                  errors.sector && "Sector moet minimaal 4 tekens zijn"
                }
              />
              <TextField
                label="Telefoonnummer"
                value={editedUser.telefoonnummer}
                fullWidth
                margin="normal"
                onChange={(e) => handleChange("telefoonnummer", e.target.value)}
                error={errors.telefoonnummer}
                helperText={errors.telefoonnummer && "Ongeldig telefoonnummer"}
              />
              <TextField
                label="Website"
                value={editedUser.website}
                fullWidth
                margin="normal"
                onChange={(e) => handleChange("website", e.target.value)}
                error={errors.website}
                helperText={errors.website && "Ongeldige website URL"}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Straat"
                value={editedUser.adres.straat}
                fullWidth
                margin="normal"
                onChange={(e) => handleAddressChange("straat", e.target.value)}
              />
              <TextField
                label="Nummer"
                value={editedUser.adres.huisnummer}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  handleAddressChange("huisnummer", e.target.value)
                }
              />
              <TextField
                label="Postcode"
                value={editedUser.adres.postcode}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  handleAddressChange("postcode", e.target.value)
                }
              />
              <TextField
                label="Gemeente"
                value={editedUser.adres.gemeente}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  handleAddressChange("gemeente", e.target.value)
                }
              />
            </Grid>
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
            Annuleer
          </Button>
          <Button
            onClick={handleSave}
            color="primary"
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            AANVRAGEN
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditBedrijf;
