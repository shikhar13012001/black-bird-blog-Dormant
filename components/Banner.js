import React from "react";
import { Button, Chip, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Icon from "@mui/material/Icon";
import Discord from "../public/discord.svg";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import BG from "../public/home.svg";
import { Tags } from "../utils/constants";
const Banner = () => {
  const heightBanner = useMediaQuery("(max-width:800px)") ? "70vh" : "130vh";
  const isLoggedIn = localStorage.getItem("token") !== null;
  const DiscordIcon = () => {
    return (
      <Icon>
        <Image src={Discord} alt="Discord" width={40} height={40} />
      </Icon>
    );
  };
  const URL =
    "https://todoist.com/_next/static/images/header@2x_b52d8f7c7bf19d6c702569d1072ed6a2.webp";
  return (
    <Container
      className="animate__animated animate__zoomIn"
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minHeight: heightBanner,
        mb: 5,
        backgroundImage: `url(${URL})`,
        backgroundSize: "contain",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          overflowX: "scroll",
          "::-webkit-scrollbar": {
            display: "none",
          },
          scrollDirection: "horizontal",
        }}
      >
        {Tags.map((text, index) => (
          <Link href={`/tags/${text}`} key={index}>
            <Chip label={text} variant="outlined" sx={{ m: 1 }} />
          </Link>
        ))}
      </Stack>
      <Typography
        variant="h1"
        className="mt-3 my-3 text-center animate__animated animate__backInUp"
        fontSize={{
          lg: 128,
          md: 100,
          sm: 80,
          xs: 80,
        }}
        sx={{ mt: 5, mb: 3, fontFamily: "MostWasted!important" }}
      >
        @BlackBird
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
        spacing={2}
        sx={{ mt: 8 }}
      >
        <Link href="/create-post">
          <Button
            variant="filled"
            endIcon={<ModeEditIcon />}
            sx={{
              width: "20em",
              height: "3em",
              bgcolor: "#E14531",
              color: "white",
              "&:hover": {
                bgcolor: "white",
                color: "black",
                border: "1px solid black",
              },
            }}
          >
            Get Started
          </Button>
        </Link>
        <Button
          variant="filled"
          endIcon={<DiscordIcon />}
          sx={{
            width: "20em",
            bgcolor: "#404EED",
            color: "white",
            display: "flex",
            mt: 2,
            height: "3em",
            "&:hover": {
              bgcolor: "black",
              color: "white",
              border: "1px solid black",
            },
          }}
        >
          Join Community
        </Button>
      </Stack>
    </Container>
  );
};
export default Banner;
