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
import Copyright from "./Copyright";
import axios from "axios";
import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../context/UserContext";

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
          fontSize: "17px",
        },
      },
    },
  },
});

export default function SignUp() {
  const navigate = useNavigate();

  const { setUserName, setPassword } = useContext(UserContext);
  const [values, setValues] = useState({
    name: "",
    age: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();

    // Email validation
    if (!values.name.includes("@")) {
      toast.error("Invalid email address. Please include '@'.");
      return;
    }

    // Age validation
    const ageValue = parseInt(values.age);
    if (isNaN(ageValue) || ageValue < 13) {
      toast.error("Invalid age. Age must be 13 or older.");
      return;
    }

    // Password strength validation
    if (values.password.length < 8) {
      toast.error("Password should be at least 8 characters long.");
      return;
    }

    // If all validations pass, proceed with signup
    axios
      .post("http://localhost:3001/signup", { values })
      .then((res) => {
        console.log(res);

        setUserName(values.name);
        setPassword(values.password);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(../public/signinpic.jpg)",
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
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={values.name}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                fullWidth
                name="age"
                label="Age"
                type="text"
                id="age"
                autoComplete="age"
                value={values.age}
                onChange={handleChange}
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
                value={values.password}
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link component={RouterLink} to="/" variant="body2">
                    {"Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable
      />
    </ThemeProvider>
  );
}
