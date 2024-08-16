import { Stack } from "@mui/material";
import FilterConfirmButton from "./FilterConfirmButton";
import FilterResetButton from "./FilterResetButton";

export default function resetConfirm({ direction = "column" }) {
  return (
    <Stack direction={direction} spacing={2}>
      <FilterConfirmButton />
      <FilterResetButton />
    </Stack>
  );
}
