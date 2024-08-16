import {
  useReducer,
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from "react";
import { useSearchParams } from "react-router-dom";

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

const constructQueryString = (searchParams) => {
  const result = Array.from(searchParams.entries())
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return result;
};

export const FilterProvider = ({ children, startSearchParams }) => {
  const [searchParams, setSearchParams] = useSearchParams(startSearchParams);
  const [queryString, setQueryString] = useState(
    constructQueryString(searchParams)
  );
  const [resetSignal, sendResetSignal] = useReducer((el) => el + 1, 0);
  const [oldResetSignal, setOldResetSignal] = useState(resetSignal);
  const [filterConfirmSignal, sendFilterConfirmSignal] = useReducer(
    (el) => el + 1,
    0
  );
  const [oldFilterConfirmSignal, setOldFilterConfirmSignal] =
    useState(filterConfirmSignal);

  // indien een filter wordt aangepast, roep buildquerystring op om het naar de backend te sturen
  const changeFilter = useCallback(
    (id, value) => {
      setSearchParams((sf) => {
        if (`${value}`.length > 0) sf.set(id, value);
        else sf.delete(id);
        return sf;
      });
    },
    [setSearchParams]
  );

  // Hierbij wordt de query string gerefactord naar nieuwe waarden
  const buildQueryString = useCallback(() => {
    setQueryString(constructQueryString(searchParams));
  }, [setQueryString, searchParams]);

  const resetFilters = useCallback(() => {
    setSearchParams((searchParams) => {
      const keys = searchParams.keys();
      for (const key of Array.from(keys)) {
        if (key !== "rijen" && key !== "pagina") {
          searchParams.delete(key);
        }
      }
      return searchParams;
    });
    setQueryString(constructQueryString(searchParams));
    sendResetSignal();
  }, [setSearchParams, sendResetSignal, setQueryString, searchParams]);

  const handleFilterConfirm = useCallback(() => {
    sendFilterConfirmSignal();
  }, [sendFilterConfirmSignal]);

  const isResetSignal = useCallback(
    () => oldResetSignal !== resetSignal,
    [resetSignal, oldResetSignal]
  );

  const isFilterConfirmSignal = useCallback(
    () => oldFilterConfirmSignal !== filterConfirmSignal,
    [oldFilterConfirmSignal, filterConfirmSignal]
  );

  useEffect(() => {
    if (isFilterConfirmSignal()) {
      setOldFilterConfirmSignal(filterConfirmSignal);
    } else {
      buildQueryString();
    }
  }, [
    buildQueryString,
    isFilterConfirmSignal,
    filterConfirmSignal,
    setOldFilterConfirmSignal,
  ]);

  useEffect(() => {
    if (isResetSignal()) {
      setOldResetSignal(resetSignal);
    }
  }, [setOldResetSignal, resetSignal, isResetSignal]);

  // zorgt ervoor dat url in browser correct staat na laden
  useEffect(() => {
    setSearchParams((sp) => sp);
  }, [setSearchParams]);

  const value = useMemo(
    () => ({
      filters: searchParams,
      changeFilter,
      handleFilterConfirm,
      filterConfirmSignal,
      queryString,
      buildQueryString,
      resetFilters,
      resetSignal,
      oldFilterConfirmSignal,
      isFilterConfirmSignal,
      isResetSignal,
    }),
    [
      changeFilter,
      isResetSignal,
      handleFilterConfirm,
      isFilterConfirmSignal,
      filterConfirmSignal,
      buildQueryString,
      queryString,
      resetFilters,
      resetSignal,
      searchParams,
      oldFilterConfirmSignal,
    ]
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
