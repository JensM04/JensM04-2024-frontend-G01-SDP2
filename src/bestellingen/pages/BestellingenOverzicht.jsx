import useSWR from "swr";
import BestellingenTable from "../components/BestellingenTable";
import AsyncData from "../../components/AsyncData";
import Title from "../../components/layout/Title";
// import { formatBestelling } from "../../utils/formatters/bestellingen";
import useDeviceDimensions from "../../utils/hooks/deviceDimensions.hook";
import BestellingenList from "../components/BestellingenList";
import { getAllBestellingen } from "../services/bestellingenApi";
import { useSearchParams } from "react-router-dom";
// import useFilter from "../../filters/hooks/useFilter";
import {
  useFilter,
  FilterProvider,
} from "../../filters/contexts/Filter.context";
import Zoekbalk from "../../filters/components/Zoekbalk";
import UUID from "../../uuid/components/UUID";
import Datum from "../../helpers/components/Datum";
import Bedrag from "../../helpers/components/Bedrag";
import Stack from "@mui/material/Stack";
import MobilePagination from "../../helpers/components/MobilePagination";
import { useMemo } from "react";

const BestellingenOverzichtContent = () => {
  const columns = [
    {
      id: "id",
      label: "ID",
      align: "right",
      format: (value) => <UUID uuid={value} />,
    },
    {
      id: "datum",
      label: "Besteldatum",
      align: "right",
      format: (value) => <Datum datum={value} />,
    },
    {
      id: "bedrag",
      label: "Totaalbedrag (\u20AC)",
      align: "right",
      format: (value) => <Bedrag bedrag={value} />,
    },
    {
      id: "bestellingstatus",
      label: "Bestellingstatus",
    },
    {
      id: "betaalstatus",
      label: "Betaalstatus",
    },
  ];

  const { queryString, filters } = useFilter();

  const { data, error, isLoading } = useSWR(
    `bestellingen${queryString && `?${queryString}`}`,
    getAllBestellingen
  );

  const { isMobile } = useDeviceDimensions();

  return (
    <Stack spacing={2} direction="column">
      <Title title="bestellingen" />
      <AsyncData loading={isLoading} error={error}>
        {!isLoading &&
          !error &&
          (isMobile() ? (
            <>
              <Zoekbalk />
              <MobilePagination aantalPaginas={data?.aantalPaginas} />
              <BestellingenList
                bestellingen={data?.items}
                enumFilters={data?.filters}
                columns={columns}
              />
              <MobilePagination aantalPaginas={data?.aantalPaginas} />
            </>
          ) : (
            <>
              <Zoekbalk />
              <BestellingenTable
                bestellingen={data?.items}
                aantalRijen={data?.aantalRijen}
                rijenPerPagina={parseInt(filters.get("rijen"))}
                huidigePagina={data?.huidigePagina}
                enumFilters={data?.filters}
                columns={columns}
              />
            </>
          ))}
      </AsyncData>
    </Stack>
  );
};

export default function BestellingenOverzicht() {
  const [searchParams] = useSearchParams();
  // startWaarden
  const pagina = searchParams.get("pagina") || 0;
  const rijen = searchParams.get("rijen") || 10;

  const initialParams = [];
  initialParams.push(["pagina", `${pagina}`]);
  initialParams.push(["rijen", `${rijen}`]);

  return (
    <FilterProvider startSearchParams={initialParams}>
      <BestellingenOverzichtContent />
    </FilterProvider>
  );
}
