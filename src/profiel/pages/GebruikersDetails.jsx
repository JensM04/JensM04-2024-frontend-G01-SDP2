import { Typography, Grid } from "@mui/material";

function GebruikersDetails({ user }) {
  return (
    <Grid item xs={6}>
      <Typography variant="body1">
        <strong>Gebruikersnaam:</strong> {user.GEBRUIKERSNAAM}
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> {user.EMAIL}
      </Typography>
    </Grid>
  );
}

export default GebruikersDetails;
