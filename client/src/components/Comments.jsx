import { useState } from "react";
import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Copyright from "./Copyright";
import ThanksMessage from "./ThanksMessage";
import Footer from "./Footer";

import { handleLikeClick, toggleCardExpansion } from "../utils";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#E50914",
      paper: "#E50914",
    },
  },
});

export default function Comments() {
  const [expandedCard, setExpandedCard] = useState(null);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            pt: 5,
            pb: 0,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Movies You Commented On
            </Typography>

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={3}>
                <Grid>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      width: "110%",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image="https://source.unsplash.com/random?wallpapers"
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        overflow: "hidden",
                        wordWrap: "break-word",
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="h2">
                        Movie title
                      </Typography>
                      <Typography>short description of movie</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() =>
                          toggleCardExpansion(card, setExpandedCard)
                        }
                      >
                        <VisibilityIcon style={{ color: "white" }} />
                      </Button>
                      <Button
                        size="small"
                        onClick={() => handleLikeClick("Movie title")}
                      >
                        <FavoriteIcon style={{ color: "white" }} />
                      </Button>
                      <Button size="small">
                        <CommentIcon style={{ color: "white" }} />
                      </Button>
                    </CardActions>
                    <Collapse in={expandedCard === card}>
                      <CardContent>
                        {/* Additional content for the expanded card */}
                        <Typography variant="body2" color="text.secondary">
                          More information about the movie.
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      <Footer />

      <ThanksMessage />
      <Copyright sx={{ pb: 6 }} />

      {/* Toast container */}
      <ToastContainer />
    </ThemeProvider>
  );
}
