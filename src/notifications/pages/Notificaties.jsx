// import { Box, Typography, Container } from "@mui/material";
import NotificationsList from "../components/NotificationsList";
import AsyncData from "../../components/AsyncData.jsx";
//import useSWR from "swr";

import { useState, useCallback, useEffect } from "react";
//import { getAllNotification } from "../../api/mockdata";
import Title from "../../components/layout/Title.jsx";
import { getAllNotification } from "../../api/mockdata.js";
export default function Notificaties() {
  const [paginaIndex, setPaginaIndex] = useState(1);
  const [notificaties, setNotificaties] = useState([]);

  // const { data, error, isLoading } = useSWR(
  //   `notificaties?pagina=${paginaIndex}&rijen=${rijenPerPagina}`,
  //   getAll
  // );

  const handleChangePagina = useCallback(
    (event, value) => {
      setPaginaIndex(value);
    },
    [setPaginaIndex]
  );

  useEffect(() => {
    setNotificaties(getAllNotification(paginaIndex).items);
  }, [setNotificaties, paginaIndex]);

  // const data = getAllNotification();
  const isLoading = false;
  const error = null;
  const getNotificatiesError = null;

  return (
    <>
      <Title title="notificaties" />
      <AsyncData loading={isLoading} error={error || getNotificatiesError}>
        <NotificationsList
          notificaties={notificaties}
          handleChangePagina={handleChangePagina}
        />
      </AsyncData>
    </>
  );
}
