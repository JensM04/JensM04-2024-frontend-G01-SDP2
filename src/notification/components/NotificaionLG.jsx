import { Avatar, Box, Typography, Stack } from "@mui/material";
import { Info } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";

export default function NotificationLG({ notification }) {
  //TODO - Notificaties dynamisch maken
  //TODO - Notificaties inladen vanuit een API
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          padding: 2,
          textDecoration: "none",
          color: theme.palette.text.primary,
        }}
        display="flex"
        component={NavLink}
        to={`/notificaties/${notification.id}`}
        alignContent="center"
        flexWrap="wrap"
      >
        <Stack spacing={2} flexWrap="wrap">
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar src={notification.avatar} sx={{ width: 56, height: 56 }} />
            <Typography variant="h2">{notification.soort}</Typography>
            <Typography variant="body1" color="text.secondary">
              {notification.datum}
            </Typography>
          </Stack>
          <Box>
            <Typography variant="body1">{notification.content}</Typography>
          </Box>
        </Stack>
        <Box
          sx={{ display: "flex", alignItems: "center", ml: "auto", padding: 4 }}
        >
          <Info />
        </Box>
      </Box>
    </>
  );
}
