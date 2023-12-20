import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ThanksMessage = () => {
  return (
    <Box sx={{ p: 0 }}>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Thanks for looking around!
      </Typography>
    </Box>
  );
};

export default ThanksMessage;
