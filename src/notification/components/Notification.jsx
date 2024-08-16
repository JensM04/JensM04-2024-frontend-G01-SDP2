import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/nl-be";

export default function Notification({ notification }) {
  // Deze functie zet een datum om naar een string zoals '2 uur geleden'
  const timeCalculator = (date) => {
    dayjs.extend(relativeTime);
    dayjs.locale("nl-be");
    return dayjs(date).fromNow();
  };

  return (
    <Card
      sx={{
        width: "100%",
        backgroundColor:
          notification.status === "ongelezen" ? "#E33D36c" : "white",
      }}
    >
      {/* Logo (Avatar) on the left side */}
      <div style={{ flex: 1, maxWidth: 400 }}>
        {/* Title in the top middle */}
        <CardHeader
          title={notification.notificatieSoort}
          subheader={notification.status}
          avatar={<Avatar src={`/${notification.avatar}`} />}
          sx={{
            textAlign: "center",
            marginBottom: "1px",
            paddingBottom: "1px",
          }}
        />

        {/* Description in the middle center */}
        <CardContent
          sx={{
            textAlign: "center",
            maxWidth: "100%",
            marginBottom: "1px",
            paddingBottom: "1px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {notification.tekst}
        </CardContent>

        {/* Timestamp in the bottom right */}
        <CardContent sx={{ textAlign: "right" }}>
          <Typography variant="body2" color="text.secondary">
            {timeCalculator(notification.datum)}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
