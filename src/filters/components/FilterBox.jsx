import { List, ListItem, Typography } from "@mui/material";
import EnumFilter from "./EnumFilter";
import TableFilter from "./TekstFilter";
import DatumFilterRange from "./DatumFilterRange";
import Box from "@mui/material/Box";
import FilterResetConfirmButtons from "./FilterResetConfirmButtons";

export default function FilterBox({
  columns,
  enumFilters,
  handleFilterConfirm,
  resetFilters,
  handleClose,
}) {
  return (
    <Box>
      <List sx={{ width: "90%", padding: 2 }}>
        {columns &&
          columns.map((column) => {
            return (
              <ListItem
                disablePadding
                key={columns.indexOf(column)}
                sx={{ marginBottom: 2 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyItems: "space-between",
                  }}
                >
                  {column.id !== "datum" && (
                    <Typography variant="body3">{column.label}</Typography>
                  )}
                  {enumFilters && enumFilters[column.id] ? (
                    <EnumFilter
                      enumObject={enumFilters[column.id]}
                      name={column.label}
                      filterKey={column.id}
                    />
                  ) : column.id !== "datum" ? (
                    <TableFilter filterKey={column.id} />
                  ) : (
                    <DatumFilterRange stackDirection="column" />
                  )}
                </Box>
              </ListItem>
            );
          })}
        <ListItem
          sx={{ justifyContent: "start", paddingLeft: 0 }}
          onClick={handleClose}
        >
          <FilterResetConfirmButtons
            direction="row"
            handleFilterConfirm={handleFilterConfirm}
            resetFilters={resetFilters}
          />
        </ListItem>
      </List>
    </Box>
  );
}
