/**
 * MovieNewsComponent displays a list of movie news articles and allows triggering notifications.
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Box, Heading, Text } from "@chakra-ui/react";
/**
 * Fetches movie news articles from the News API and displays them on the screen.
 * Allows the user to trigger notifications using the browser's Notification API.
 *
 * @returns {JSX.Element} The rendered MovieNewsComponent.
 */
const MovieNewsComponent = () => {
  // State to store movie news articles
  const [movieNews, setMovieNews] = useState([]);

  /**
   * Fetch movie news articles from the News API.
   */
  useEffect(() => {
    const fetchData = async () => {
      // API key and keyword for movie news
      const apiKey = "356490041d06479d822a56f75b3586ee";
      const movieKeyword = "movie";
      const apiUrl = `https://newsapi.org/v2/everything?q=${movieKeyword}&apiKey=${apiKey}`;

      try {
        // Fetch the data using Axios
        const response = await axios.get(apiUrl);
        setMovieNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching movie news:", error);
      }
    };

    fetchData();
  }, []);

  // Counter and interval ID for notifications
  let notificationCounter = 0;
  let notificationIntervalId;

  /**
   * Click event handler to trigger notifications.
   */
  const clickToNotify = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      // Start interval to trigger notifications every 2 seconds
      notificationIntervalId = setInterval(() => {
        notificationCounter++;
        new Notification(`Notification ${notificationCounter}`, {
          body: "Hello, world!",
        });
      }, 2000);
    } else if (
      "Notification" in window &&
      Notification.permission !== "denied"
    ) {
      // Request permission if not granted
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          clickToNotify();
        }
      });
    }
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      maxWidth="900px"
      margin="auto"
      marginTop="20px"
    >
      <Heading fontSize="24px" width="100%">
        Movie News
      </Heading>
      {movieNews.map((article) => (
        <Box
          key={article.title}
          width="100%"
          boxSizing="border-box"
          border="5px solid #E50914"
          borderRadius="10px"
          padding="15px"
          marginBottom="15px"
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
        >
          <Text fontSize="18px" marginBottom="5px" display="block">
            {article.title}
          </Text>
          <Text>{article.description}</Text>
          <Button onClick={() => clickToNotify(article)} marginTop="10px">
            Trigger Notification
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default MovieNewsComponent;
