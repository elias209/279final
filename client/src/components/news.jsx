import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieNewsComponent = () => {
  const [movieNews, setMovieNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "356490041d06479d822a56f75b3586ee";
      const movieKeyword = "movie";
      const apiUrl = `https://newsapi.org/v2/everything?q=${movieKeyword}&apiKey=${apiKey}`;

      try {
        const response = await axios.get(apiUrl);
        setMovieNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching movie news:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        maxWidth: "900px",
        margin: "auto",
        marginTop: "20px",
      }}
    >
      <h2 style={{ fontSize: "24px", width: "100%" }}>Movie News</h2>
      {movieNews.map((article) => (
        <div
          key={article.title}
          style={{
            width: "100%", // Set to 100% width for mobile devices
            boxSizing: "border-box",
            border: "5px solid #E50914",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "15px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <strong
            style={{ fontSize: "18px", marginBottom: "5px", display: "block" }}
          >
            {article.title}
          </strong>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieNewsComponent;
