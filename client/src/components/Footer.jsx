import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box sx={{ p: 0 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        CineSearch
      </Typography>
    </Box>
  );
};

export default Footer;
