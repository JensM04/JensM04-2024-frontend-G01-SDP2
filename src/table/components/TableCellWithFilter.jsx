import { TableCell, Box, TableSortLabel } from "@mui/material";
import EnumFilter from "../../filters/components/EnumFilter";
import TableFilter from "../../filters/components/TekstFilter";
import DatumFilterRange from "../../filters/components/DatumFilterRange";
import { useFilter } from "../../filters/contexts/Filter.context";
import { useCallback, useMemo } from "react";
import { visuallyHidden } from "@mui/utils";

export default function TableCellWithFilter({
  column,
  enumFilters,
  hasSorting = false,
}) {
  const { filters, changeFilter } = useFilter();
  const order = useMemo(() => filters.get("order"), [filters]);
  const orderBy = useMemo(() => filters.get("order_by"), [filters]);
  // const order = filters.get("order");
  // const orderBy = filters.get("order-by");

  const handleRequestSort = useCallback(
    (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      changeFilter("order", isAsc ? "desc" : "asc");
      changeFilter("order_by", property);
    },
    [order, orderBy, changeFilter]
  );

  const createSortHandler = useCallback(
    (property) => (event) => {
      handleRequestSort(event, property);
    },
    [handleRequestSort]
  );

  return (
    <TableCell
      key={column.id}
      align={column.align}
      style={{ minWidth: column.minWidth }}
      variant="head"
      sortDirection={orderBy === column.id ? order || "asc" : false}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        {hasSorting ? (
          <Box display="flex" flexDirection="row" gap={1}>
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
              {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </Box>
        ) : (
          column.label
        )}
        {enumFilters && enumFilters[column.id] ? (
          <EnumFilter
            enumObject={enumFilters[column.id]}
            name={column.label}
            filterKey={column.id}
          />
        ) : column.id !== "datum" ? (
          <TableFilter data-cy={`${column.id}_filter`} filterKey={column.id} />
        ) : (
          <DatumFilterRange />
        )}
      </Box>
    </TableCell>
  );
}
