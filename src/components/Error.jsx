import { isAxiosError } from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";

export default function Error({ error }) {
  if (isAxiosError(error)) {
    return (
      <Card sx={{ backgroundColor: "#FFCCCC" }} data-cy="error_component">
        <CardContent>
          <Typography variant="body1">
            <ErrorIcon sx={{ marginRight: "8px" }} />
            {error.data?.message || error.message}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ backgroundColor: "#FFCCCC" }}>
        <CardContent>
          <Typography variant="body1">
            <ErrorIcon sx={{ marginRight: "8px" }} />
            {error.message || JSON.stringify(error)}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return null;
}
