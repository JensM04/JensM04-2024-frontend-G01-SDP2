import React from "react";
import { Typography, Grid } from "@mui/material";

function AdresDetails({ bedrijf }) {
  return (
    <Grid item xs={6}>
      <Typography variant="body1">
        <strong>Adres:</strong>
      </Typography>
      <Typography variant="body1">
        {bedrijf.adres.straat}, {bedrijf.adres.huisnummer}
      </Typography>
      <Typography variant="body1">
        {bedrijf.adres.postcode} {bedrijf.adres.gemeente}
      </Typography>
    </Grid>
  );
}

export default AdresDetails;
