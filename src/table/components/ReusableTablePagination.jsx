import { useFilter } from "../../filters/contexts/Filter.context";
import { useCallback } from "react";
import { TablePagination } from "@mui/material";
export default function ReusableTablePagination({
  aantalRijen,
}) {
  const { filters, changeFilter, handleFilterConfirm } = useFilter();

  const handleChangePagina = useCallback(
    (event, value) => {
      changeFilter("pagina", `${+value}`);
      handleFilterConfirm();
    },
    [handleFilterConfirm, changeFilter]
  );

  const handleChangeRij = useCallback(
    (event) => {
      changeFilter("pagina", `${0}`);
      changeFilter("rijen", `${+event.target.value}`);
      handleFilterConfirm();
    },
    [handleFilterConfirm, changeFilter]
  );

  return (
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={aantalRijen}
      rowsPerPage={parseInt(filters.get("rijen"))}
      page={parseInt(filters.get("pagina"))}
      onPageChange={handleChangePagina}
      onRowsPerPageChange={handleChangeRij}
    />
  );
}
