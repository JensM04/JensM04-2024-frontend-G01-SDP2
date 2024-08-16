import { Button } from "@mui/material";
import FilterDialog from "./FilterDialog";

export default function MobileFilterButton({
  handleClose,
  columns,
  enumFilters,
  handleFilterConfirm,
  resetFilters,
  open,
  handleOpen,
}) {
  return (
    <>
      <FilterDialog
        open={open}
        handleClose={handleClose}
        columns={columns}
        enumFilters={enumFilters}
        handleFilterConfirm={handleFilterConfirm}
        resetFilters={resetFilters}
      />
      <Button sx={{ width: "100%", marginBottom: 2 }} onClick={handleOpen}>
        Filter
      </Button>
    </>
  );
}
