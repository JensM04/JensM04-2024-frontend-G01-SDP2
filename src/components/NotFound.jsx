import { useLocation } from "react-router";
import Error from "./Error";

export default function NotFound() {
  const { pathname } = useLocation();
  const errorMessage = `Pagina niet gevonden! Er bestaat geen pagina met als url ${pathname}, probeer iets anders.`;
  return (
    <>
      <>
        <Error error={{ message: errorMessage }} />
      </>
    </>
  );
}
