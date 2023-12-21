import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

/**
 * Functional component for displaying a thanks message.
 *
 * @returns {JSX.Element} The JSX element containing the thanks message.
 */
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
