import {
  Box,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Avatar,
  TableFooter,
} from "@mui/material";
import FilterResetConfirmButtons from "../../filters/components/FilterResetConfirmButtons";
import { NavLink } from "react-router-dom";
import TableCellWithFilter from "../../table/components/TableCellWithFilter";
import { useFilter } from "../../filters/contexts/Filter.context";
import ReusableTablePagination from "../../table/components/ReusableTablePagination";

export default function NotificationTable({
  notificaties,
  aantalRijen,
  rijenPerPagina = 10,
  huidigePagina = 0,
  columns,
  enumFilters,
}) {
  const startFilters = columns.reduce((pv, cv) => {
    pv[cv.id] = "";
    return pv;
  }, {});

  startFilters.rijenPerPagina = rijenPerPagina;
  startFilters.aantalRijen = aantalRijen;
  startFilters.huidigePagina = huidigePagina;

  const { handleFilterConfirm, resetFilters } = useFilter();

  return (
    <>
      <Box>
        <TableContainer>
          <ReusableTablePagination
            aantalRijen={aantalRijen}
            handleConfirmFilter={handleFilterConfirm}
          />
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) =>
                  column.id != "avatar" ? (
                    <TableCellWithFilter
                      key={column.soort}
                      column={column}
                      enumFilters={enumFilters}
                    />
                  ) : (
                    <TableCell
                      key={column.field}
                      style={{ maxWidth: "4px", padding: "8px" }}
                    >
                      {column.label}
                    </TableCell>
                  )
                )}
                <TableCell>
                  <FilterResetConfirmButtons
                    handleFilterConfirm={handleFilterConfirm}
                    resetFilters={resetFilters}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notificaties?.length === 0 ? (
                <TableRow data-cy="geen_notifs">
                  <TableCell colSpan={5}>Geen notificaties</TableCell>
                </TableRow>
              ) : (
                notificaties?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      backgroundColor:
                        row.status == "gelezen" ? "#d3d3d3" : "#ffffff",
                      fontWeight: row.status == "gelezen" ? "normal" : "bold",
                      textDecoration: "none",
                    }}
                    component={NavLink}
                    to={`/notificaties/${row.id}`}
                    data-cy="notificatie"
                  >
                    <TableCell>
                      <Box display={"flex"}>
                        <Avatar
                          src={`/${row.avatar}`}
                          sx={{ width: 30, height: 30 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "inherit", padding: 1 }}
                      align="center"
                    >
                      {row.soort}
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: 400,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontWeight: "inherit",
                        padding: 1,
                      }}
                    >
                      {row.content}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "inherit", padding: 1 }}
                      align="center"
                    >
                      {row.bestelling}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "inherit",
                        padding: 1,
                      }}
                      align="right"
                    >
                      {row.datum}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>

          <ReusableTablePagination
            aantalRijen={aantalRijen}
            handleConfirmFilter={handleFilterConfirm}
          />
        </TableContainer>
      </Box>
    </>
  );
}
