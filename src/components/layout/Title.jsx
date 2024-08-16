import { Box, Typography, useTheme } from "@mui/material";
import "../../assets/fonts/mulish.css";
import { memo } from "react";

export default memo(function Title({ title }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: 2,
      }}
    >
      <Typography variant="h1" color={theme.palette.secondary.main}>
        {title}
      </Typography>
    </Box>
  );
})
