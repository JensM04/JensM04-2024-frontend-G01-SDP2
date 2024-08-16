import { Dialog } from "@mui/material";
import FilterBox from "./FilterBox";

export default function filterDialog({
  open,
  handleClose,
  columns,
  enumFilters,
  handleFilterConfirm,
  resetFilters,
}) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="90%" fullWidth>
      <FilterBox
        columns={columns}
        enumFilters={enumFilters}
        handleFilterConfirm={handleFilterConfirm}
        resetFilters={resetFilters}
        handleClose={handleClose}
      />
    </Dialog>
  );
}
