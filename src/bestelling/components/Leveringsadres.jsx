import { memo } from "react";
import InfoComponent from "./InfoComponent";

export default memo(function AlgemeneInfoBestelling({ bestelling }) {
  const listItems = [
    {
      key: "Straat",
      value: bestelling.STRAAT,
    },
    {
      key: "Huisnummer",
      value: bestelling.HUISNUMMER,
    },
    {
      key: "Postcode",
      value: bestelling.POSTCODE,
    },
    {
      key: "Gemeente",
      value: bestelling.GEMEENTE,
    },
  ];

  return <InfoComponent listItems={listItems} infoHeader={"Leveringsadres"} />;
});
