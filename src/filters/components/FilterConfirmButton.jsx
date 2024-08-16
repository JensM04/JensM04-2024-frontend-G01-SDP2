import { useFilter } from "../contexts/Filter.context";
import Button from "@mui/material/Button";

export default function FilterConfirmButton({ buttonText, ...rest }) {
  const { handleFilterConfirm } = useFilter();

  return (
    <Button onClick={handleFilterConfirm} data-cy="filter_confirm" {...rest}>
      {buttonText || "Filter"}
    </Button>
  );
}
