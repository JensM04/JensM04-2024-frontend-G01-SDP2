import { useState, useEffect } from "react";
import { Button, Paper, Typography, Box, Stack } from "@mui/material";
import { getUserById, confirmUpdateById } from "../../api/Bedrijven";
import { get } from "../../api";
import useSWR from "swr";
import EditBedrijf from "./EditBedrijf";
import ProfielHeader from "./ProfielHeader";
import BedrijfDetails from "./BedrijfDetails";
import AdresDetails from "./AdresDetails";
import GebruikersDetails from "./GebruikersDetails";
import EditGebruiker from "./EditGebruiker";
import { updateBedrijfById, updateUserById } from "../../api/Bedrijven";
import BestellingenOverzicht from "../../bestellingen/pages/BestellingenOverzicht";
import ConfirmationDialog from "./ConfirmationDialog";
import { useTheme } from "@mui/material";

function Profiel() {
  const [user, setUser] = useState(null);
  const [bedrijf, setBedrijf] = useState(null);
  const [openBedrijfModal, setOpenBedrijfModal] = useState(false);
  const [openGebruikerModal, setOpenGebruikerModal] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const theme = useTheme();

  const { data: fetchedBedrijf, error, isLoading } = useSWR("bedrijven", get);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userid = localStorage.getItem("UserId");
        const userData = (await getUserById(userid)).data;
        setUser(userData);
        setBedrijf(fetchedBedrijf);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (fetchedBedrijf) {
      fetchData();
    }
  }, [fetchedBedrijf]);

  const handleEditGebruiker = () => {
    setOpenGebruikerModal(true);
  };

  const handleEditBedrijf = () => {
    setOpenBedrijfModal(true);
  };

  const handleCloseModal = () => {
    setOpenBedrijfModal(false);
    setOpenGebruikerModal(false);
  };

  const handleSaveChangesBedrijf = async (formData) => {
    try {
      setConfirmationDialogOpen(true);
      await updateBedrijfById(bedrijf.id, formData);
    } catch (error) {
      console.error("Error updating bedrijf", error);
    }
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };

  const handleSaveChangesGebruiker = async (editedUser) => {
    try {
      const updatedUser = { ...user, ...editedUser };
      setUser(updatedUser);
      await updateUserById(user.ID, editedUser);
      handleCloseModal();
    } catch (error) {
      console.error("Error updating gebruiker:", error);
    }
  };

  const handleConfirmUpdate = async () => {
    try {
      await confirmUpdateById(bedrijf.id);
    } catch (error) {
      console.error("Error confirming update:", error);
    }
  };

  return (
    <>
      {bedrijf && user && (
        <Stack
          spacing={2}>
          <ProfielHeader user={user} xs={12} />
          <Stack
            direction={{xs: 'column', md: 'row'}}
            spacing={2}
            >
            <Paper 
              elevation={3} 
              sx={{ padding: 2, flexGrow: 1 }}
              >
              <Typography variant="h5" color={theme.palette.secondary.main}>
                Bedrijf
              </Typography>
              <BedrijfDetails bedrijf={bedrijf} />
              <AdresDetails bedrijf={bedrijf} />
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditBedrijf}
                >
                  Pas aan
                </Button>
              </Box>
            </Paper>
            <Paper 
              elevation={3} 
              sx={{ padding: 2, flexGrow: 1, display: "flex",
                    flexDirection: "column" }}
              >
              <Typography variant="h5" color={theme.palette.secondary.main}>
                Account
              </Typography>
              <GebruikersDetails user={user} />
              <Box display="flex"
              width="100%"
              justifyContent="flex-end"
              alignSelf="baseline">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditGebruiker}
                >
                  Pas aan
                </Button>
              </Box>
            </Paper>
          </Stack>
          <Button
            sx={{width: 'fit-content'}}
            onClick={handleConfirmUpdate}
          >
            Bevestig
          </Button>
          <EditBedrijf
            user={bedrijf}
            openModal={openBedrijfModal}
            handleCloseModal={handleCloseModal}
            handleSaveChanges={handleSaveChangesBedrijf}
          />
          <EditGebruiker
            user={user}
            openModal={openGebruikerModal}
            handleCloseModal={handleCloseModal}
            handleSaveChanges={handleSaveChangesGebruiker}
          />
          <Box paddingTop={8}>
            <BestellingenOverzicht />
          </Box>
        </ Stack>
      )}

      <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
      />
    </>
  );
}

export default Profiel;
