import NativeSelect from "@mui/material/NativeSelect";
import { useCallback, useEffect, useState } from "react";
import { useFilter } from "../contexts/Filter.context";

export default function EnumFilter({ name, enumObject, filterKey, ...rest }) {
  const { changeFilter, filters, isResetSignal, isFilterConfirmSignal } =
    useFilter();

  const [value, setValue] = useState(
    (filters.has(filterKey) && filters.get(filterKey)) || ""
  );
  const inputProps = {
    name,
  };

  const handleChange = useCallback(
    (event) => {
      event.preventDefault();
      const value = event.target.value;
      setValue(value);
    },
    [setValue]
  );

  useEffect(() => {
    if (isFilterConfirmSignal()) {
      changeFilter(filterKey, value);
    }
  }, [isFilterConfirmSignal, filterKey, value, changeFilter]);

  useEffect(() => {
    if (isResetSignal()) {
      setValue("");
    }
  }, [isResetSignal, setValue]);

  return (
    <NativeSelect
      inputProps={inputProps}
      value={value}
      onChange={handleChange}
      sx={{ zIndex: 1000 }}
      data-cy={`${name.toLowerCase()}_select`}
      {...rest}
    >
      <option></option>
      {Object.entries(enumObject).map(([k, v]) => (
        <option
          style={{ zIndex: 1000 }}
          key={k}
          value={k}
          data-cy={`${v}_option`}
        >
          {v.toUpperCase()}
        </option>
      ))}
    </NativeSelect>
  );
}
