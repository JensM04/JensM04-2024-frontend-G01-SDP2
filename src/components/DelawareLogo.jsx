import Box from '@mui/material/Box'
export default function DelawareLogo({...rest}) {
  return (
    <Box {...rest}>
      <img
        src="/logoDelaware.png"
        alt="DELAWARE"
        height={40}
        style={{ margin: 2 }}
      />
    </Box>
  );
}
