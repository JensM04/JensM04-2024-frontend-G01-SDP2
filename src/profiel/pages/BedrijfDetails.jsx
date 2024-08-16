import { Typography, Checkbox, Grid } from "@mui/material";
import BTWNr from "./BTWNr";

function BedrijfDetails({ bedrijf }) {
  return (
    <Grid item xs={6}>
      {bedrijf && (
        <>
          <Typography variant="body1">
            <strong>Email:</strong> {bedrijf.email}
          </Typography>
          <Typography variant="body1">
            <strong>Actief:</strong>
            <Checkbox checked={bedrijf.isActief} color="primary" disabled />
          </Typography>
          <Typography variant="body1">
            <strong>Bedrijfsnaam:</strong> {bedrijf.naam}
          </Typography>
          <Typography variant="body1">
            <strong>Sector:</strong> {bedrijf.sector}
          </Typography>
          <Typography variant="body1">
            <strong>Telefoonnummer:</strong> {bedrijf.telefoonnummer}
          </Typography>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <strong>BTWNummer: </strong>
            <BTWNr btwnr={bedrijf.BTWNr} />
          </Typography>
          <Typography variant="body1">
            <strong>Website:</strong>{" "}
            <a href={bedrijf.website} target="_blank" rel="noopener noreferrer">
              {bedrijf.website}
            </a>
          </Typography>
        </>
      )}
    </Grid>
  );
}

export default BedrijfDetails;
