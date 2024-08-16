import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./contexts/Auth.context.jsx";
import { createTheme, ThemeProvider } from "@mui/material";
import "./assets/fonts/mulish.css";
import App from "./App.jsx";

const primary = {
  main: "#c42828",
};

const secondary = {
  main: "#ef463c",
};

const tertiary = {
  main: "#ef4b41",
};

const text = {
  primary: "#404040",
  secondary: "#3c3c3c",
};

const background = {
  main: "#ffffff",
  accent: "#f5f5f5",
};

const theme = createTheme({
  palette: {
    primary,
    secondary,
    tertiary,
    text: {
      primary: text.primary,
      secondary: text.secondary,
      // main: text.primary,
    },
    background: {
      main: background.main,
      accent: background.accent,
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 400,
      fontFamily: "Mulish",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      fontFamily: "Mulish",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      fontFamily: "Mulish",
    },
    h4: {
      fontSize: "1.3rem",
      fontWeight: 600,
      fontFamily: "Mulish",
      color: primary.main,
    },
    body1: {
      fontFamily: "Mulish",
      fontSize: "16px",
      color: text.primary,
    },
    body2: {
      fontFamily: "Mulish",
      color: text.secondary,
    },
    body3: {
      fontFamily: "Mulish",
      color: primary.main,
      fontWeight: "bold",
      fontSize: "0.9rem",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: "primary",
        variant: "contained",
      },
    },
    MuiLink: {
      defaultProps: {
        variant: "body1",
        underline: "always",
        color: text.primary,
      },
      styleOverrides: {
        root: {
          ":hover": {
            color: primary.main,
            opacity: "75%",
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontFamily: "Mulish",
          fontSize: "1.5rem",
          fontWeight: 600,
        },
        subheader: {
          fontFamily: "Mulish",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "head" && {
            color: primary.main,
            fontWeight: "bold",
          }),
        }),
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          color: text.primary,
          fontWeight: "bold",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: text.secondary,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          width: "100%",
          minWidth: 275,
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        item: {
          flexGrow: 1,
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          alignSelf: "flex-end",
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          fontFamily: "Mulish",
          fontWeight: "bold",
          fontSize: "1.3rem",
          marginBottom: "0",
          color: primary.main,
          textAlign: "left",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
