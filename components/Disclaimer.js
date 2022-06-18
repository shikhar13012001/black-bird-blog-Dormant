import React from "react";
import Developer from "../public/developer.jpeg";
import Image from "next/image";
import { Typography, Grid, Container } from "@mui/material";
import Link from "next/link";
const Center = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};
const Disclaimer = () => {
  return (
    <Container>
      <Grid container columns={12}>
        <Grid item xs={12} sm={12} md={6} lg={6} sx={Center}>
          <Typography
            variant="h1"
            fontSize={{
              lg: 128,
              md: 96,
              sm: 72,
              xs: 48,
            }}
            sx={{ fontWeight: "light", color: "black", mt: 3 }}
          >
            Disclaimer
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: "light", color: "black", mt: 3 }}
          >
            This project is a learning project for AWS and Nextjs, hence this
            project has went cold and has not been updated in a long time. If
            you are interested in this project, please curb your curiosity.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{ ...Center, alignItems: "center" }}
        >
          <Image
            src={require("../public/disclaimer.png")}
            alt="disclaimer"
            objectPosition={"center"}
            objectFit="cover"
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default Disclaimer;
