import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Klantgegevens from "../components/Klantgegevens";
import Leveringsadres from "../components/Leveringsadres";
import ProductenInBestellingTabel from "../components/ProductenInBestelling";
import { getBedrijfById } from "../../api/Bedrijven";
import { createNotif, save } from "../../api";
import {
  getByBestellingId,
  getProductenInBestelling,
} from "../../bestellingen/services/Bestellingen";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import QrDialog from "../components/QrDialog";
import useSWRMutation from "swr/mutation";
import { socket } from "../../api/socket";
import useSWR from "swr";
import AsyncData from "../../components/AsyncData";
import { getLaatsteNotificatie } from "../../api/Notificaties";
import NotificationSnackbar from "../../notifications/components/NotificationSnackbar";
import AlgemeneInfoBestelling from "../components/AlgemeneInfoBestelling";
import UUID from "../../uuid/components/UUID";
import { useAuth } from "../../contexts/Auth.context";
import {urlBestellingen} from '../../navigation/utils/defaultUrls'
export default function BestellingOverzicht() {
  const bestellingId = useParams().id;
  const [bedrijfId, setBedrijfId] = useState(localStorage.getItem("company"));
  useEffect(() => {
    setBedrijfId(localStorage.getItem("company"));
  }, []);
  const {role}= useAuth();
  // const {user} = useAuth();
  // const bedrijfId = user.BEDRIJFID;
  
  const [laatstebetalingsherinnering, setLaatsteBetalingsherinnering] =
    useState("");
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const { trigger: betaal } = useSWRMutation(
    `betalingen/${bestellingId}`,
    save
  );

  const {
    data: bestellingData,
    error: bestellingError,
    isLoading: bestellingLoading,
  } = useSWR(`bestellingen/${bestellingId}`, getByBestellingId);

  const {
    data: klantData,
    error: klantError,
    isLoading: klantLoading,
  } = useSWR(
    () => (bestellingData ? `bedrijven/${bestellingData.klantid}` : null),
    getBedrijfById
  );

  const {
    data: productenData,
    error: productenError,
    isLoading: productenLoading,
  } = useSWR(bedrijfId ? `productenBestelling?bedrijfId=${bedrijfId}&bestellingId=${bestellingId}` : null, getProductenInBestelling);

  const {
    data: betalingsHerinnering,
    error: betalingsHerinneringError,
    isLoading: betalingsHerinneringLoading,
  } = useSWR(`notificaties/bestelling/${bestellingId}`, getLaatsteNotificatie);

  useEffect(() => {
    if (!betalingsHerinneringLoading) {
      if (betalingsHerinneringError) {
        setLaatsteBetalingsherinnering("error");
      } else {
        setLaatsteBetalingsherinnering(betalingsHerinnering.datum);
      }
    }
  }, [
    setLaatsteBetalingsherinnering,
    betalingsHerinnering,
    betalingsHerinneringError,
    betalingsHerinneringLoading,
  ]);

  const handleClickOpen = useCallback(async () => {
    setOpen(true);

    try {
      if (!bestellingData) {
        return;
      }
      await betaal({
        betaalbedrag: bestellingData?.BEDRAG,
      });
    } catch (error) {
      console.log(error);
    }
  }, [setOpen, betaal, bestellingData]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setSnackOpen(true);
  }, [setOpen]);

  const handleSnackClose = useCallback(() => {
    setSnackOpen(false);
  }, [setSnackOpen]);

  const clickBetalingsherinnering = async (
    bestellingId,
    leverancierId,
    klantId
  ) => {
    try {
      const herinneringResponse = await createNotif(
        "notificaties",
        bestellingId,
        leverancierId,
        klantId
      );
      socket.emit("notification_sent", {
        leverancierId: localStorage.getItem("UserId"),
        klantId: klantId,
      });
      return herinneringResponse;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <AsyncData
        loading={bestellingLoading || klantLoading || productenLoading}
        error={bestellingError || klantError || productenError}
      >
        {!bestellingLoading && !bestellingError && (
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  marginBottom="10px"
                >
                  <Box display="flex" alignItems="center">
                    <Button
                      component={Link}
                      to={urlBestellingen}
                      variant="contained"
                      style={{ marginRight: 10 }}
                    >
                      Terug
                    </Button>
                    <Typography
                      variant="h3"
                      component="div"
                      marginRight="10px"
                      fontWeight="bold"
                    >
                      Bestelling #{<UUID uuid={bestellingData.id} />}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper>
                  {!betalingsHerinneringLoading && (
                    <AlgemeneInfoBestelling
                      bestelling={bestellingData}
                      betalingHerrinering={laatstebetalingsherinnering}
                    />
                  )}
                </Paper>
              </Grid>
              {!klantLoading && !klantError && (
                <Grid item xs={12} sm={6}>
                  <Paper
                    style={{
                      color: "#000",
                      height: "100%",
                    }}
                  >
                    <Klantgegevens klant={klantData} />
                  </Paper>
                </Grid>
              )}
              {!productenLoading && !productenError && (
                <Grid item xs={12}>
                  <Paper
                    style={{
                      color: "#000",
                    }}
                  >
                    <ProductenInBestellingTabel
                      producten={productenData.productenInBestelling}
                    />
                  </Paper>
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <Paper
                  style={{
                    color: "#000",
                  }}
                >
                  <Leveringsadres bestelling={bestellingData} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  marginBottom="10px"
                >
                  <Box display="flex" alignItems="center">
                    { role === "Klant" && (
                      <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        style={{
                          marginRight: "10px",
                        }}
                      >
                        Betaal
                      </Button>
                      )
                    }
                    <QrDialog
                      open={open}
                      onClose={handleClose}
                      bedrag={bestellingData.bedrag}
                    />
                    <NotificationSnackbar
                      open={snackOpen}
                      content={"Betaling succesvol!"}
                      handleClose={handleSnackClose}
                    />
                    {role === "Leverancier" && (
                      <Button
                        component={Link}
                        onClick={() => {
                          clickBetalingsherinnering(
                            bestellingData.oudId,
                            bestellingData.leverancierid,
                            bestellingData.klantid
                          );
                        }}
                      >
                        Betalingsherinnering
                      </Button>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </AsyncData>
    </>
  );
}
