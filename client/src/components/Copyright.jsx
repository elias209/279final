import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// Copyright component displaying the copyright information with a link
export default function Copyright(props) {
  /**
   * Returns a JSX element that represents the copyright information.
   *
   * @returns {JSX.Element} The JSX element representing the copyright information.
   */
  function Copyright() {
    return (
      // Typography component for copyright information
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        {/* Link component for the app name with a link to http://localhost:5173/ */}
        <Link color="inherit" href="http://localhost:5173/">
          CineSearch
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
}
