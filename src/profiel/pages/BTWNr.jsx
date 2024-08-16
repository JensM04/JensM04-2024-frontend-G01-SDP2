import { Typography } from "@mui/material";

const BTWNr = ({ btwnr }) => {
  const formattedBTWNr = btwnr.replace(
    /BE(\d{4})(\d{3})(\d{3})/,
    "BE $1 $2 $3"
  );

  return <Typography variant="body1">{formattedBTWNr}</Typography>;
};

export default BTWNr;
