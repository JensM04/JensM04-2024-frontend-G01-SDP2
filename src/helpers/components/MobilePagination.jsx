import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useCallback } from "react";
import { useFilter } from "../../filters/contexts/Filter.context";

export default function MobilePagination({
  aantalPaginas,
}) {
  const { filters, changeFilter, handleFilterConfirm } = useFilter();

  const handleChangePagina = useCallback(
    (event, page) => {
      changeFilter("pagina", `${(page - 1)}`);
      handleFilterConfirm();
    },
    [handleFilterConfirm, changeFilter]
  );

  return (
    <Stack spacing={2}>
      <Pagination
        count={aantalPaginas}
        page={parseInt(filters.get("pagina")) + 1}
        onChange={handleChangePagina}
        variant="outlined"
        shape="rounded"
        data-cy="mobile_pagination"
      />
    </Stack>
  );
}
