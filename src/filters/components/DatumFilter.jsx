import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFilter } from "../contexts/Filter.context";

export default function DatumFilter({
  label,
  filterKey,
  defaultDate = undefined,
  minDate = "2010/01/01",
  maxDate,
  disableFuture = true,
  ...rest
}) {
  const { changeFilter, filters, isFilterConfirmSignal } = useFilter();

  let startValue;

  if (filters.has(filterKey) && !isNaN(new Date(filters.get(filterKey)))) {
    startValue = dayjs(new Date(filters.get(filterKey)));
  } else {
    startValue =
      defaultDate == undefined ? undefined : dayjs(new Date(defaultDate));
  }

  const [value, setValue] = useState(startValue);

  const handleChange = useCallback(
    (newValue) => {
      setValue(newValue);
    },
    [setValue]
  );

  useEffect(() => {
    if (isFilterConfirmSignal()) {
      if (value != undefined) {
        changeFilter(filterKey, value.toISOString());
      }
    }
  }, [isFilterConfirmSignal, changeFilter, filterKey, value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="nl-be">
      <DatePicker
        label={label}
        value={value}
        onChange={handleChange}
        disableFuture={disableFuture}
        minDate={minDate && dayjs(minDate)}
        maxDate={maxDate && dayjs(maxDate)}
        {...rest}
      />
    </LocalizationProvider>
  );
}
