import React, { useEffect } from "react";

import { Box, Paper } from "@mui/material";
import { Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
const dTransform = ({ x, y, z }) => {
  return `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
};
const Feed = ({ title, x, y, z, translateX, translateY }) => {
  //detect scroll position when this div is in viewport
  useEffect(() => {
    var observer = new IntersectionObserver(
      function (entries) {
        // isIntersecting is true when element and viewport are overlapping
        // isIntersecting is false when element and viewport don't overlap
        if (entries[0].isIntersecting === true)
          console.log("Element has just become visible in screen");
      },
      { threshold: [0.2] }
    );

    observer.observe(document.querySelector("#main-container"));
  }, []);

  return (
    <div
      style={{ width: "100%", minHeight: "100vh", overflowX: "hidden" }}
      id="main-container"
    >
      <Paper
        sx={{
          width: "fit-content",
          display: "flex",
          alignItems: "center",
          p: "0 20px",
        }}
        elevation={2}
        className="feed"
      >
        <FiberManualRecordIcon />
        <Typography
          variant="h1"
          sx={{ fontWeight: "bold", fontSize: 100, whiteSpace: "nowrap" }}
        >
          {"OH! SNAP I AM HERE"}
        </Typography>
      </Paper>
    </div>
  );
};

export default Feed;
