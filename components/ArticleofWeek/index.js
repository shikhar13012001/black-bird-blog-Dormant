import { Grid,Typography } from "@mui/material";
import React from "react";
import Test from "../../public/testimonial.jpg";
import Image from "next/image";
const Article = () => {
  return (
    <Grid
      container
      columns={12}
      sx={{
        backgroundColor: "black",
        width: "100%",
        minHeight: "100vh",
        mt: 10,
      }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        sx={{ display: "grid", placeContent: "center" }}
      >
        <Typography
          variant="h1"
          sx={{ fontWeight: "light", color: "white", mt: 3, fontSize: 128 }}
        >
          Write your Life here
        </Typography>
        <Typography
          variant="body1"
          
          sx={{color:"gray", fontWeight: "light",width:"70%",textAlign:'justify',ml:2 }}
        >
          People say that Facebook, Quora, Twitter and Google+ are great for
          idea generation – and they’re right. I think it’s also important to
          open yourself up to the moment. What do you read/see/experience that
          inspires you – and how can you share this with your readers?
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        sx={{
          backgroundImage: `url(${"https://i.ibb.co/Vg3hDWX/boldare-wireframe-mock.jpg"})`,
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",
        }}
      ></Grid>
    </Grid>
  );
};

export default Article;
