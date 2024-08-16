// import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import TableCellWithFilter from "../../table/components/TableCellWithFilter";
import ReusableTablePagination from "../../table/components/ReusableTablePagination";
import FilterResetButton from "../../filters/components/FilterResetButton";
import FilterConfirmButton from "../../filters/components/FilterConfirmButton";
import { memo } from "react";

const BestellingenTableBody = memo(function BestellingenTableBody({
  bestellingen,
  columns,
}) {
  const navigate = useNavigate();

  return (
    <TableBody>
      {bestellingen?.map((row) => {
        return (
          <TableRow
            hover
            tabIndex={-1}
            key={row.id}
            onClick={() => navigate(`/bestellingen/${row.id}`)}
            style={{ cursor: "pointer", textDecoration: "none" }}
            data-cy="bestelling"
          >
            {columns.map((column) => {
              const value = row[column.id];
              return (
                <TableCell key={column.id} align={column.align}>
                  {column.format ? column.format(value) : value}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
});

const BestellingenTable = memo(function BestellingenTable({
  bestellingen,
  rijenPerPagina = 10,
  aantalRijen,
  huidigePagina = 0,
  enumFilters,
  columns,
}) {
  const startFilters = columns.reduce((pv, cv) => {
    pv[cv.id] = "";
    return pv;
  }, {});
  startFilters.rijenPerPagina = rijenPerPagina;
  startFilters.aantalRijen = aantalRijen;
  startFilters.huidigePagina = huidigePagina;

  return (
    // <Paper sx={{ width: "100%", overflow: "hidden" }}>
    <>
      <TableContainer>
        <ReusableTablePagination aantalRijen={aantalRijen} />
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCellWithFilter
                    key={column.id}
                    column={column}
                    enumFilters={enumFilters}
                    hasSorting={true}
                  />
                );
              })}
              <TableCell>
                <Stack direction="column" spacing={2}>
                  <FilterConfirmButton />
                  <FilterResetButton />
                </Stack>
              </TableCell>
            </TableRow>
          </TableHead>
          <BestellingenTableBody
            bestellingen={bestellingen}
            columns={columns}
          />
        </Table>
      </TableContainer>
      <ReusableTablePagination aantalRijen={aantalRijen} />
    </>
    // </Paper>
  );
});

export default BestellingenTable;
