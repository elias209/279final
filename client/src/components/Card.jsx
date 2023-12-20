import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleLikeClick } from "../utils";
import ThanksMessage from "./ThanksMessage";
import Copyright from "./Copyright";
import { UserContext } from "../context/UserContext";
import Footer from "./Footer";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#E50914",
      paper: "#E50914",
    },
  },
  typography: {
    fontSize: 10, // Set the font size here
  },
});

export default function Album() {
  const [movies, setMovies] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const { userName } = useContext(UserContext);
  console.log(userName);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const API_KEY = "8ff3a5d6";
        const TITLE = "all";
        const URL = `https://www.omdbapi.com/?s=${TITLE}&apikey=${API_KEY}&plot=full`;

        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const finalData = await response.json();
        if (finalData.Search) {
          setMovies(finalData.Search);
        } else {
          console.error("No Marvel movies found in the API response.");
        }
      } catch (error) {
        console.error("Error fetching Marvel movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const fetchMovieDetails = async (imdbID) => {
    try {
      const API_KEY = "8ff3a5d6";
      const detailURL = `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}&plot=full`;
      const response = await fetch(detailURL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const detailedData = await response.json();
      return detailedData;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  };

  const toggleCardExpansion = async (cardId, buttonType) => {
    if (buttonType === "visibility") {
      setExpandedCard((prevExpanded) =>
        prevExpanded === cardId ? null : cardId
      );

      if (expandedCard !== cardId) {
        const detailedData = await fetchMovieDetails(cardId);
        console.log(detailedData);

        // Update the state with the retrieved data
        setMovies((prevMovies) => {
          const updatedMovies = prevMovies.map((movie) => {
            if (movie.imdbID === cardId) {
              return {
                ...movie,
                Plot: detailedData?.Plot || "", // Update the Plot field
                Genre: detailedData?.Genre || "", // Update the Genre field
                Director: detailedData?.Director || "", // Update the Director field
              };
            }
            return movie;
          });
          return updatedMovies;
        });
      }
    }
  };

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            pt: 0,
            pb: 0,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              variant="h5"
              align="center"
              color="text.primary"
              paragraph
              sx={{
                mt: 2,
                position: "absolute", // Add this line
                top: 0, // Add this line
                right: "40px",
                bottom: "px", // Add this line
              }}
            >
              Welcome, {userName}!
            </Typography>
          </Container>

          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ pt: 4 }}
            >
              CineSearch
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Discover, Explore, and Enjoy Your Movie Journey
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Slider {...settings}>
            {movies.map((movie) => (
              <Grid item key={movie.imdbID} spacing={2}>
                <Container
                  maxWidth="md"
                  sx={{
                    py: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    sx={{
                      height: "100%", // Set a fixed height for the card
                      display: "flex",
                      flexDirection: "column",
                      width: "95%",
                      margin: "0 10px", // Added margin for spacing
                    }}
                    onClick={() => toggleCardExpansion(movie.imdbID)}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // Maintain aspect ratio and adjust height accordingly
                        pt: "75%", // Adjust this value based on your preference
                        backgroundPosition: "top", // Ensure the poster is not cut from the top
                      }}
                      image={movie.Poster}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        overflow: "hidden",
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {movie.Title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {movie.Plot}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        sx={{ width: "100%" }}
                      >
                        <Button
                          size="small"
                          onClick={() =>
                            toggleCardExpansion(movie.imdbID, "visibility")
                          }
                        >
                          <VisibilityIcon style={{ color: "white" }} />
                        </Button>
                        <Button
                          size="small"
                          onClick={() => handleLikeClick(movie.Title)}
                        >
                          <FavoriteIcon style={{ color: "white" }} />
                        </Button>
                        <Button size="small">
                          <CommentIcon style={{ color: "white" }} />
                        </Button>
                      </Stack>
                    </CardActions>
                    <Collapse
                      in={expandedCard === movie.imdbID}
                      timeout="auto"
                      unmountOnExit
                    >
                      <CardContent>
                        <Typography paragraph>
                          Year released: {movie.Year}
                        </Typography>
                        <Typography paragraph>Type: {movie.Type}</Typography>
                        <Typography paragraph>
                          Director: {movie.Director || "N/A"}{" "}
                          {/* Display "N/A" if Director field is empty */}
                        </Typography>
                        <Typography paragraph>
                          Genre: {movie.Genre || "N/A"}{" "}
                          {/* Display "N/A" if Genre field is empty */}
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Container>
              </Grid>
            ))}
          </Slider>
        </Container>
      </main>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable
      />

      <Footer />

      <ThanksMessage />
      <Copyright sx={{ pb: 6 }} />
    </ThemeProvider>
  );
}
