import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import NotificationSnackbar from "./notifications/components/NotificationSnackbar";
import NotFound from "./components/NotFound";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import Profiel from "./profiel/pages/Profiel";
import PrivateRoute from "./components/PrivateRoute";
import NotificatieDetailPagina from "./notification/pages/NotficatieDetailPagina";
import NotificatiesNieuw from "./notifications/pages/NotificatiesNieuw";
import Producten from "./producten/pages/Producten";
import Root from "./Root";
import { useEffect, useState } from "react";
import BestellingenOverzicht from "./bestellingen/pages/BestellingenOverzicht";
import BestellingOverzicht from "./bestelling/pages/Bestelling";
import { socket } from "./api/socket";
import HomePageRedirect from "./navigation/components/HomePageRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePageRedirect />,
      },
      {
        path: "producten",
        element: <Producten />,
      },
      {
        path: "bestellingen",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <BestellingenOverzicht />,
          },
          {
            path: ":id",
            element: <BestellingOverzicht />,
          },
        ],
      },

      {
        path: "/notificaties",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <NotificatiesNieuw />,
          },
          {
            path: ":id",
            element: <NotificatieDetailPagina />,
          },
        ],
      },

      {
        path: "/profiel",
        element: <PrivateRoute />,
        children: [{ index: true, element: <Profiel /> }],
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("new_connection", {
        userId: localStorage.getItem("UserId"),
        role: localStorage.getItem("role"),
      });
    });
    socket.on("disconnect", () => {});

    socket.on("notification_popup", (data) => {
      setOpen(true);
      setContent(
        data.message === "sent"
          ? "Notificatie verzonden"
          : "U heeft 1 nieuwe notificatie"
      );
    });
  });

  function handleClose() {
    setOpen(false);
  }
  return (
    <>
      <RouterProvider router={router} />
      <NotificationSnackbar
        open={open}
        content={content}
        handleClose={handleClose}
      />
    </>
  );
}

export default App;
