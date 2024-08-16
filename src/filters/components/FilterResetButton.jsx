import { useFilter } from "../contexts/Filter.context";
import Button from "@mui/material/Button";

export default function FilterResetButton() {
  const { resetFilters } = useFilter();

  return (
    <Button onClick={resetFilters} variant="outlined" data-cy="filter_reset">
      Reset
    </Button>
  );
}
