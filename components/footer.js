import React from "react";
import { Typography } from "@mui/material";
const Footer = () => {
  return (
    <footer
      style={{
        position: "static",
        bottom: 0,
        width: "100%",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Typography
        variant="body1"
        style={{ color: "white", textAlign: "center" }}
      >
        This asset/project was built by Shikhar, so fuck off
      </Typography>
    </footer>
  );
};

export default Footer;
