import { useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth.context";
import Error from "../components/Error";
import { FormProvider, useForm } from "react-hook-form";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const validationRules = {
  username: {
    required: "Email of gebruikersnaam is verplicht",
  },
  password: {
    required: "Wachtwoord is verplicht",
  },
};

export default function Login() {
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();

  const redirect = useMemo(() => {
    const urlParams = new URLSearchParams(search);
    if (urlParams.has("redirect")) return urlParams.get("redirect");
    return "/";
  }, [search]);

  const methods = useForm({});

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = methods;

  const handleLogin = useCallback(
    async ({ username, password }) => {
      const loggedIn = await login(username, password);

      if (loggedIn) {
        if (redirect === "/") {
          navigate({
            pathname:
              localStorage.getItem("role") === "Leverancier"
                ? "/bestellingen"
                : "/producten",
            replace: true,
          });
        } else {
          navigate({
            pathname: redirect,
            replace: true,
          });
        }
      }
    },
    [login, navigate, redirect]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(handleLogin)}
            noValidate
            sx={{ mt: 1 }}
          >
            {error && <Error error={error} />}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email/Gebruikersnaam"
              name="username"
              disabled={isSubmitting}
              autoFocus
              {...register("username", validationRules.username)}
              error={!!errors.username}
              helperText={errors.username?.message}
              data-cy="username_input"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Wachtwoord"
              type="password"
              id="password"
              disabled={isSubmitting}
              {...register("password", validationRules.password)}
              error={!!errors.password}
              helperText={errors.password?.message}
              data-cy="password_input"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#E33D36" }}
              disabled={loading}
              data-cy="login_button"
            >
              Log in
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
}
