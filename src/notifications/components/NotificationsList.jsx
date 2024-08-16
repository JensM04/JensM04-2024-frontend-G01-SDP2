import { NavLink } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import NotificationDetail from "../../notification/components/NotificationDetail";
import MobilePagination from "../../helpers/components/MobilePagination";
import { useFilter } from "../../filters/contexts/Filter.context";
import { useState } from "react";
import MobileFilterButton from "../../filters/components/MobileFilterButton";

export default function NotificationsList({
  notificaties,
  handleChangePagina,
  huidigePagina,
  aantalPaginas,
  columns,
  enumFilters,
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const { handleFilterConfirm, resetFilters } = useFilter();

  return (
    <>
      <MobileFilterButton
        open={open}
        handleClose={handleClose}
        columns={columns}
        enumFilters={enumFilters}
        handleFilterConfirm={handleFilterConfirm}
        resetFilters={resetFilters}
        handleOpen={() => setOpen(true)}
      />
      <Stack spacing={2}>
        <MobilePagination
          handleChangePagina={handleChangePagina}
          huidigePagina={huidigePagina}
          aantalPaginas={aantalPaginas}
        />
        {notificaties.length === 0 && (
          <Typography variant="body1">Geen notificaties gevonden</Typography>
        )}
        {notificaties.map((noti) => (
          <NavLink
            style={{
              textDecoration: "none",
            }}
            to={`/notificaties/${noti.id}`}
            key={noti.id}
          >
            <NotificationDetail key={noti.id} notification={noti} />
          </NavLink>
        ))}

        <MobilePagination
          handleChangePagina={handleChangePagina}
          huidigePagina={huidigePagina}
          aantalPaginas={aantalPaginas}
        />
      </Stack>
    </>
  );
}
