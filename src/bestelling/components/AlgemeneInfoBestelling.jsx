import { memo } from "react";
import InfoComponent from "./InfoComponent";
import UUID from "../../uuid/components/UUID";
import Datum from "../../helpers/components/Datum";
import Bedrag from "../../helpers/components/Bedrag";

export default memo(function AlgemeneInfoBestelling({
  bestelling,
  betalingHerrinering,
}) {
  const listItems = [
    {
      key: "Bestellingnummer",
      value: <UUID uuid={bestelling.id} />,
    },
    {
      key: "Besteldatum",
      value: <Datum datum={new Date(bestelling.datum)} />,
    },
    {
      key: "Laatste betalingsherinnering",
      value:
        betalingHerrinering == "error" || betalingHerrinering == "" ? (
          "Geen betalingsherrineringen"
        ) : (
          <Datum datum={new Date(betalingHerrinering)} />
        ),
    },
    {
      key: "Bedrag",
      value: <Bedrag bedrag={bestelling.bedrag} />,
    },
    {
      key: "Betaalstatus",
      value: bestelling.betaalstatus,
    },
    {
      key: "Bestellingstatus",
      value: bestelling.bestellingstatus,
    },
  ];

  return (
    <InfoComponent listItems={listItems} infoHeader={"Algemene gegevens"} />
  );
});
