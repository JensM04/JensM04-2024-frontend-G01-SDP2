import Stack from "@mui/material/Stack";
import DatumFilter from "./DatumFilter";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useFilter } from "../contexts/Filter.context";

let minDatum = new Date("2010-01-01");
minDatum.setHours(0, 0, 0, 0);
minDatum = dayjs(minDatum);

export default function DatumFilterRange({ stackDirection = "row" }) {
  const { filters, changeFilter, isFilterConfirmSignal, isResetSignal } =
    useFilter();

  let vanDatum;
  if (filters.has("vanDatum") && !isNaN(new Date(filters.get("vanDatum")))) {
    vanDatum = dayjs(new Date(filters.get("vanDatum")));
  } else {
    vanDatum = undefined;
  }

  let totDatum;
  if (filters.has("totDatum") && !isNaN(new Date(filters.get("totDatum")))) {
    totDatum = dayjs(new Date(filters.get("totDatum")));
  } else {
    totDatum = undefined;
  }

  const [vanDatumValue, setVanDatumValue] = useState(vanDatum);
  const [totDatumValue, setTotDatumValue] = useState(totDatum);

  const handleVanDatumChange = useCallback(
    (newValue) => {
      if (newValue.diff(totDatumValue) > 0) {
        setVanDatumValue((val) => val);
        return;
      }

      setVanDatumValue(newValue);
    },
    [totDatumValue, setVanDatumValue]
  );

  const handleTotDatumChange = useCallback(
    (newValue) => {
      if (newValue.diff(vanDatumValue) < 0) {
        setTotDatumValue((val) => val);
        return;
      }
      setTotDatumValue(newValue);
    },
    [vanDatumValue, setTotDatumValue]
  );

  useEffect(() => {
    if (isFilterConfirmSignal()) {
      if (vanDatumValue != undefined) {
        changeFilter("totDatum", totDatumValue.toISOString());
      }
      if (totDatumValue != undefined) {
        changeFilter("vanDatum", vanDatumValue.toISOString());
      }
    }
  }, [isFilterConfirmSignal, changeFilter, totDatumValue, vanDatumValue]);

  useEffect(() => {
    if (isResetSignal()) {
      setVanDatumValue(null);
      setTotDatumValue(null);
    }
  }, [isResetSignal, setVanDatumValue, setTotDatumValue]);

  return (
    <Stack direction={stackDirection} spacing={2}>
      <DatumFilter
        filterKey="vanDatum"
        label="Van datum"
        disableFuture={true}
        value={vanDatumValue}
        maxDate={totDatumValue}
        onChange={handleVanDatumChange}
      />
      <DatumFilter
        filterKey="totDatum"
        label="Tot datum"
        disableFuture={true}
        value={totDatumValue}
        minDate={vanDatumValue}
        onChange={handleTotDatumChange}
      />
    </Stack>
  );
}
