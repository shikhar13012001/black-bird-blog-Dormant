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
        padding:10
      }}
    >
      <Typography
        variant="body1"
        style={{ color: "white", textAlign: "center" }}
      >
        This asset/project was built by Black Bird 🚀.
      </Typography>
    </footer>
  );
};

export default Footer;
