import useSWR from "swr";
import Title from "../../components/layout/Title";
import Zoekbalk from "../../filters/components/Zoekbalk";
import ProductenList from "../components/ProductenList";
import Stack from "@mui/material/Stack";
import AsyncData from "../../components/AsyncData";
import { useSearchParams } from "react-router-dom";
import * as productApi from "../services/Producten";
import {
  useFilter,
  FilterProvider,
} from "../../filters/contexts/Filter.context";
import MobilePagination from "../../helpers/components/MobilePagination";

const ProductenContent = () => {
  const { queryString } = useFilter();

  const { data, error, isLoading } = useSWR(
    `${queryString && `?${queryString}`}`,
    productApi.getAllProducten
  );

  return (
    <Stack spacing={2} direction="column">
      <Title title="producten" />
      <Zoekbalk />
      <AsyncData loading={isLoading} error={error}>
        {!isLoading && !error && (
          <>
            <MobilePagination aantalPaginas={data?.aantalPaginas} />
            <ProductenList producten={data?.items} />
            <MobilePagination aantalPaginas={data?.aantalPaginas} />
          </>
        )}
      </AsyncData>
    </Stack>
  );
};

export default function Producten() {
  const [searchParams] = useSearchParams();
  // startWaarden
  const pagina = searchParams.get("pagina") || 0;
  const rijen = searchParams.get("rijen") || 16;

  const initialParams = [];
  initialParams.push(["pagina", `${pagina}`]);
  initialParams.push(["rijen", `${rijen}`]);

  return (
    <FilterProvider startSearchParams={initialParams}>
      <ProductenContent />
    </FilterProvider>
  );
}
