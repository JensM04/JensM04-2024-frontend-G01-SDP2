import { memo, useState } from "react";
import MobileFilterButton from "../../filters/components/MobileFilterButton.jsx";
import { useFilter } from "../../filters/contexts/Filter.context.jsx";
import BestellingListItem from "./BestellingListItem.jsx";

export default memo(function BestellingenList({
  bestellingen,
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
      {bestellingen.map((bestelling) => (
        <BestellingListItem key={bestelling.id} bestelling={bestelling} />
      ))}
    </>
  );
});
