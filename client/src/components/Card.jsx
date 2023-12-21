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
import TextField from "@mui/material/TextField";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    fontSize: 10,
  },
});

export default function Album() {
  const { userName } = useContext(UserContext);

  const [expandedCard, setExpandedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch movies based on the search term
        const API_KEY = "8ff3a5d6";
        const TITLE = searchTerm || "all";
        const URL = `https://www.omdbapi.com/?s=${TITLE}&apikey=${API_KEY}&plot=full`;

        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        /**
         * Renders a movie search interface with a responsive slider, search input, and footer.
         *
         * @returns {JSX.Element} The rendered movie search interface.
         */

        const finalData = await response.json();
        if (finalData.Search) {
          setSearchResults(finalData.Search);
        } else {
          console.error("No movies found in the API response.");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  const fetchMovieDetails = async (imdbID) => {
    try {
      // Fetch detailed information for a specific movie
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
      // Toggle card expansion and fetch detailed data if expanding
      setExpandedCard((prevExpanded) =>
        prevExpanded === cardId ? null : cardId
      );

      if (expandedCard !== cardId) {
        const detailedData = await fetchMovieDetails(cardId);

        setSearchResults((prevMovies) => {
          const updatedMovies = prevMovies.map((movie) => {
            if (movie.imdbID === cardId) {
              return {
                ...movie,
                Plot: detailedData?.Plot || "",
                Genre: detailedData?.Genre || "",
                Director: detailedData?.Director || "",
              };
            }
            return movie;
          });
          return updatedMovies;
        });
      }
    }
  };

  // Settings for the Slider component
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
        {/* Header section */}
        <Box
          sx={{
            pt: 0,
            pb: 0,
          }}
        >
          <Container maxWidth="sm">
            {/* Display user's name */}
            <Typography
              variant="h5"
              align="center"
              color="text.primary"
              paragraph
              sx={{
                mt: 2,
                position: "absolute",
                top: 0,
                right: "40px",
              }}
            >
              Welcome, {userName}!
            </Typography>
            <Container maxWidth="sm">
              {/* Main title */}
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
              {/* Subtitle */}
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                Discover, Explore, and Enjoy Your Movie Journey
              </Typography>
            </Container>
            {/* Search input */}
            <TextField
              label="Search movies"
              variant="outlined"
              fullWidth
              margin="normal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                "& label.Mui-focused": {
                  color: "red",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "red",
                    borderWidth: "3px",
                    borderRadius: "15px", // Set the border size to 5px
                  },
                  "&:hover fieldset": {
                    borderColor: "red",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red",
                  },
                },
              }}
            />
          </Container>
        </Box>
        {/* Movie slider */}
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Slider {...settings}>
            {searchResults.map((movie) => (
              <Grid item key={movie.imdbID} spacing={2}>
                <Container
                  maxWidth="md"
                  sx={{
                    py: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {/* Movie card */}
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      width: "95%",
                      margin: "0 10px",
                    }}
                    onClick={() => toggleCardExpansion(movie.imdbID)}
                  >
                    {/* Movie poster */}
                    <CardMedia
                      component="div"
                      sx={{
                        pt: "75%",
                        backgroundPosition: "top",
                      }}
                      image={movie.Poster}
                    />
                    {/* Movie content */}
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
                    {/* Movie actions (visibility, favorite, comment) */}
                    <CardActions>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        sx={{ width: "100%" }}
                      >
                        {/* Visibility button */}
                        <Button
                          size="small"
                          onClick={() =>
                            toggleCardExpansion(movie.imdbID, "visibility")
                          }
                        >
                          <VisibilityIcon style={{ color: "white" }} />
                        </Button>
                        {/* Favorite button */}
                        <Button size="small">
                          <FavoriteIcon style={{ color: "white" }} />
                        </Button>
                        {/* Comment button */}
                        <Button size="small">
                          <CommentIcon style={{ color: "white" }} />
                        </Button>
                      </Stack>
                    </CardActions>
                    {/* Collapse section with additional movie details */}
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
                          Director: {movie.Director || "N/A"}
                        </Typography>
                        <Typography paragraph>
                          Genre: {movie.Genre || "N/A"}
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
      {/* Toast notification container */}
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable
      />
      {/* Footer component */}
      <Footer />
      {/* ThanksMessage component */}
      <ThanksMessage />
      {/* Copyright component */}
      <Copyright sx={{ pb: 6 }} />
    </ThemeProvider>
  );
}
