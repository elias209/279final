import * as React from "react";
import { useContext, useState } from "react";
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

const ProfilePicture = ({ profileImage }) => (
  <Avatar
    src={profileImage}
    sx={{
      width: 100,
      height: 100,
      borderRadius: "50%",
      margin: "0 auto",
    }}
  />
);

const UserProfile = () => {
  const { userName, password } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setProfileImage(URL.createObjectURL(file));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
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
                  <ProfilePicture profileImage={profileImage} />
                </CardMedia>

                <CardContent sx={{ backgroundColor: "black", color: "#fff" }}>
                  <Typography variant="body1">Username: {userName}</Typography>
                  {password !== undefined && (
                    <Typography variant="body1">
                      Password: {password}
                    </Typography>
                  )}
                  {/* Input for uploading a new profile picture */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
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
