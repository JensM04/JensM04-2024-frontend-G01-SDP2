import BTWNr from "../../profiel/pages/BTWNr";
import { memo } from "react";
import InfoComponent from "./InfoComponent";

export default memo(function AlgemeneInfoBestelling({ klant }) {
  const listItems = [
    {
      key: "Naam",
      value: klant.naam,
    },
    {
      key: "Email",
      value: klant.email,
    },
    {
      key: "BTW-nummer",
      value: <BTWNr btwnr={klant.BTWNr} />,
    },
    {
      key: "Telefoonnummer",
      value: klant.telefoonnummer,
    },
    {
      key: "Sector",
      value: klant.sector,
    },
  ];

  return <InfoComponent listItems={listItems} infoHeader={"Klantgegevens"} />;
});
