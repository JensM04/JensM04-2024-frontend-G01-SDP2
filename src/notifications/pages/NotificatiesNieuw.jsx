import NotificationTable from "../components/NotificationTable";
import useSWR from "swr";
import { getAllNotifs } from "../utils/notificaties";
import AsyncData from "../../components/AsyncData";
import { formatNotification } from "../utils/notiFormatter";
import { useCallback } from "react";
import Title from "../../components/layout/Title";
import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import {
  useFilter,
  FilterProvider,
} from "../../filters/contexts/Filter.context";
import useDeviceDimensions from "../../utils/hooks/deviceDimensions.hook";
import NotificationsList from "../components/NotificationsList";

const NotificatieOverzichtContent = () => {
  const {
    queryString,
    changeFilter,
    buildQueryString,
    handleFilterConfirm,
    filters,
    resetFilters,
    resetSignal,
  } = useFilter();

  const columns = [
    { id: "avatar", label: "Zender", width: "10%" },
    { id: "notificatieSoort", label: "Type", width: 130 },
    { id: "content", label: "Inhoud", width: 130 },
    { id: "bestelling", label: "Bestelling", width: 90 },
    { id: "datum", label: "Datum", align: "center", width: 130 },
  ];

  const { data, isLoading, error } = useSWR(
    `notificaties${queryString && `?${queryString}`}`,
    getAllNotifs
  );

  const { isMobile } = useDeviceDimensions();

  const handleChangePagina = useCallback(
    (event, value) => {
      changeFilter("pagina", value);
      buildQueryString();
    },
    [changeFilter, buildQueryString]
  );

  const handleChangeRij = useCallback(
    (event) => {
      changeFilter("pagina", 0);
      changeFilter("rijen", +event.target.value);
      buildQueryString();
    },
    [buildQueryString, changeFilter]
  );

  return (
    <>
      <Title title="notificaties" />
      {/* <Box sx={{ width: "25%", height: "100%" }}>
          <FilterBox items={categories} />
        </Box> */}
      <Box sx={{ width: "100%" }}>
        <AsyncData loading={isLoading} error={error}>
          {!isLoading &&
            !error &&
            (isMobile() ? (
              <>
                <NotificationsList
                  notificaties={data?.items.map(formatNotification)}
                  huidigePagina={data?.huidigePagina + 1}
                  aantalPaginas={data?.aantalPaginas}
                  handleChangePagina={(event, value) =>
                    handleChangePagina(event, value - 1)
                  }
                  columns={columns}
                  enumFilters={data?.filters}
                />
              </>
            ) : (
              <NotificationTable
                notificaties={data?.items.map(formatNotification)}
                rijenPerPagina={parseInt(filters.get("rijen"))}
                huidigePagina={data?.huidigePagina + 1}
                aantalRijen={data?.aantalRijen}
                handleChangePagina={handleChangePagina}
                handleChangeRij={handleChangeRij}
                handleFilterConfirm={handleFilterConfirm}
                enumFilters={data?.filters}
                resetFilters={resetFilters}
                resetSignal={resetSignal}
                columns={columns}
              />
            ))}
        </AsyncData>
      </Box>
    </>
  );
};

export default function NotificatiesNieuw() {
  const [searchParams] = useSearchParams();

  const pagina = searchParams.get("pagina") || 0;
  const rijen = searchParams.get("rijen") || 10;

  const initialParams = [];
  initialParams.push(["pagina", pagina]);
  initialParams.push(["rijen", rijen]);

  return (
    <FilterProvider startSearchParams={initialParams}>
      <NotificatieOverzichtContent />
    </FilterProvider>
  );
}
