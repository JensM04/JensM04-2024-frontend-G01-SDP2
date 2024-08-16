import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import NotificationDropdown from "../../notifications/components/NotificationDropdown";
import DelawareLogo from "../../components/DelawareLogo";
import { useAuth } from "../../contexts/Auth.context";
import { CssBaseline, useTheme } from "@mui/material";
import NavButton from "./NavButton1";
import Stack from "@mui/material/Stack";
import MobileNavMenuItem from "./MobileNavMenuItem";
import {
  urlBestellingen,
  urlLogin,
  urlLogout,
  urlProducten,
  urlProfiel,
} from "../utils/defaultUrls";

const paginas = [
  { titel: "producten", link: urlProducten },
  { titel: "bestellingen", link: urlBestellingen },
];

const instellingen = [
  { titel: "Profiel", link: urlProfiel },
  { titel: "Log uit", link: urlLogout },
];

const SettingsMenu = ({
  handleOpenUserMenu,
  handleCloseUserMenu,
  anchorElUser,
}) => {
  const { isAuthed } = useAuth();
  const theme = useTheme();
  return (
    <>
      <Tooltip title="Instellingen">
        <IconButton
          sx={{ p: 0 }}
          {...(isAuthed
            ? {
                onClick: handleOpenUserMenu,
              }
            : {
                to: urlLogin,
                component: Link,
              })}
          data-cy="avatar"
        >
          <Avatar
            alt="avatar"
            variant="circular"
            sx={{
              backgroundColor: "transparent",
              color: theme.palette.text.secondary,
            }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {isAuthed &&
          instellingen.map((setting) => (
            <MenuItem
              key={setting.titel}
              onClick={handleCloseUserMenu}
              to={setting.link}
              data-cy={setting.titel}
              component={Link}
            >
              <Typography textAlign="center">{setting.titel}</Typography>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

const PaginaMenu = ({ handleOpenNavMenu, anchorElNav, handleCloseNavMenu }) => {
  const { isAuthed, role } = useAuth();
  const urlHomePage =
    !isAuthed || role === "Klant"
      ? urlProducten
      : role === "Leverancier"
      ? urlBestellingen
      : "/";
  return (
    <>
      <DelawareLogo
        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
        to={urlHomePage}
        component={Link}
      />

      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {paginas.map((page) => (
            <MobileNavMenuItem
              key={page.titel}
              component={Link}
              to={page.link}
              onClick={handleCloseNavMenu}
            >
              {page.titel}
            </MobileNavMenuItem>
          ))}
        </Menu>
      </Box>
      <DelawareLogo
        sx={{ display: { xs: "flex", md: "none", flexGrow: 1 } }}
        to={"/"}
        component={Link}
      />
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: { xs: "none", md: "contents" } }}
        >
          {paginas.map((page) => (
            <NavButton
              key={page.titel}
              onClick={handleCloseNavMenu}
              to={page.link}
              sx={{ my: 2, display: "block" }}
            >
              {page.titel}
            </NavButton>
          ))}
        </Stack>
      </Box>
    </>
  );
};

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = useCallback(
    (event) => {
      event.preventDefault();
      setAnchorElNav(event.currentTarget);
    },
    [setAnchorElNav]
  );

  const handleOpenUserMenu = useCallback(
    (event) => {
      event.preventDefault();
      setAnchorElUser(event.currentTarget);
    },
    [setAnchorElUser]
  );

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, [setAnchorElNav]);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, [setAnchorElUser]);

  const { isAuthed } = useAuth();

  const theme = useTheme();

  return (
    <>
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{
          bgcolor: theme.palette.background.default,
          marginBottom: 2,
          color: theme.palette.text.secondary,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <PaginaMenu
              anchorElNav={anchorElNav}
              handleCloseNavMenu={handleCloseNavMenu}
              handleOpenNavMenu={handleOpenNavMenu}
            />
            <Box sx={{ flexGrow: 0 }}>
              {isAuthed ? <NotificationDropdown /> : null}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <SettingsMenu
                anchorElUser={anchorElUser}
                handleCloseUserMenu={handleCloseUserMenu}
                handleOpenUserMenu={handleOpenUserMenu}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
