import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

function NotificationDetail({ notification }) {
  return (
    <Card>
      <CardHeader
        title={notification.soort}
        avatar={
          <Avatar src={`/${notification.avatar}`} alt={notification.avatar} />
        }
        subheader={notification.datum}
      />

      <CardContent>
        <Typography variant="body1">
          {notification.content} | {notification.status}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationDetail;
