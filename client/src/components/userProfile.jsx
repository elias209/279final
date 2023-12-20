// userProfile.jsx

import * as React from "react";
import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserContext } from "../context/UserContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#E50914",
    },
  },
});

const ProfilePicture = () => (
  <Avatar
    sx={{
      width: 100,
      height: 100,
      borderRadius: "50%",
      margin: "0 auto",
    }}
  >
    {/* You can add an icon or an image here */}
    {/* For example: <img src="/path/to/placeholder-image.jpg" alt="Profile" /> */}
  </Avatar>
);

const UserProfile = () => {
  const { userName, password } = useContext(UserContext);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: "url(../public/signinpic.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
        >
          {/* End hero unit */}
          <Grid container spacing={10}>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "100%",
                  margin: "auto",
                  backgroundColor: "#E50914",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    pt: "56.25%",
                    backgroundColor: "black",
                  }}
                >
                  {/* Use the ProfilePicture component */}
                  <ProfilePicture />
                </CardMedia>

                <CardContent sx={{ backgroundColor: "black", color: "#fff" }}>
                  <Typography variant="body1">Username: {userName}</Typography>
                  {password !== undefined && (
                    <Typography variant="body1">
                      Password: {password}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default UserProfile;
