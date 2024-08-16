// import NavBar from "./components/navigation/NavBar";
import ResponsiveAppBar from "./navigation/components/ResponsiveAppBar";
import Container from "@mui/material/Container";
import { ScrollRestoration, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <ResponsiveAppBar />

      <Container>
        <Outlet />
        <ScrollRestoration />
      </Container>
    </>
  );
}
