import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";

export default function Notification({ notification }) {
  return (
    <Card sx={{ display: "flex", width: "100%" }}>
      {/* Logo (Avatar) on the left side */}
      <Avatar
        src={notification.avatar} /*sx={{ flex: 'none', marginRight: '16px' }}*/
      />

      <div style={{ flex: 1, maxWidth: 300 }}>
        {/* Title in the top middle */}
        {/* Niet zeker of deze margin en padding zo aanpassen een goeie practice is, eens navragen */}
        <CardHeader
          title={notification.title}
          sx={{
            textAlign: "center",
            marginBottom: "1px",
            paddingBottom: "1px",
          }}
        />

        {/* Description in the middle center */}
        {/* Niet zeker of deze margin en padding zo aanpassen een goeie practice is, eens navragen */}
        <CardContent
          sx={{
            textAlign: "center",
            whiteSpace: "pre-line",
            marginBottom: "1px",
            paddingBottom: "1px",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            {notification.description}
          </Typography>
        </CardContent>

        {/* Timestamp in the bottom right */}
        <CardContent sx={{ textAlign: "right" }}>
          <Typography variant="body2" color="text.secondary">
            {notification.timestamp}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
