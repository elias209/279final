import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create a dark theme using MUI's createTheme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000",
    },
    secondary: {
      main: "#E50914",
    },
  },
  components: {
    // Customize styles for MUI components like Button, TextField, and Link
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#E50914",
          "&:hover": {
            backgroundColor: "#E50914",
          },
          padding: "15px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E50914",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E50914",
          },
          marginBottom: "25px",
          fontSize: "17px",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#E50914",
        },
      },
    },
  },
});

/**
 * Represents a sign-in form component.
 *
 * This component uses Material-UI components and styling to create a visually appealing and responsive form.
 * It handles form submission, sends a login request using axios, and displays success or error messages using the react-toastify library.
 *
 * @example
 * import SignInSide from "./SignInSide";
 *
 * const App = () => {
 *   return (
 *     <div>
 *       <SignInSide />
 *     </div>
 *   );
 * };
 *
 * export default App;
 *
 * @returns {JSX.Element} The sign-in form component.
 */
const SignInSide = () => {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setUserName } = React.useContext(UserContext);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Send a login request using axios
    axios
      .post("http://localhost:3001/login", { name, password })
      .then((res) => {
        console.log(res);
        setUserName(name);
        // Navigate to the dashboard on successful login
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        // Display an error toast if login fails
        toast.error("Login failed. Please check your credentials.");
      });
  };

  return (
    // Wrap the component with MUI's ThemeProvider to apply the dark theme
    <ThemeProvider theme={darkTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(../signnuppic.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {/* Input fields for name and password */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Sign In button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              {/* Links to navigate to Sign Up and a copyright notice */}
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link component={RouterLink} to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>

              {/* Copyright notice */}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* Toast container for displaying notifications */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
};

export default SignInSide;
