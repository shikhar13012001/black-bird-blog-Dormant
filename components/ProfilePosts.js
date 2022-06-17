import React, { useState, useEffect } from "react";
import { Grid, Typography, Stack } from "@mui/material";
import { Storage } from "aws-amplify";
const ProfilePosts = ({ post }) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    //fetch post cover image
    if (post.coverImage) {
      Storage.get(post.coverImage).then((url) => {
        setImage(url);
      });
    }
  }, [post.coverImage]);
  return (
    <Grid
      container
      className="shadow-lg"
      columns={12}
      sx={{ width: 350, mr: 2, mt: 4, height: "fit-content" }}
    >
      <Stack
        sx={{ width: "100%", display: "flex", flexWrap: "wrap", gap: 2 }}
        direction={"row"}
      >
        {post.Category?.map((category, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{ fontWeight: "light", mb: 1, p: 1, color: "gray" }}
          >
            {category}
          </Typography>
        ))}
      </Stack>
      <Grid item xs={12} sx={{ display: "grid", placeContent: "center" }}>
        <img src={image} alt="cover" />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mt: 1,
            ml: 2,
            "&:hover": {
              cursor: "pointer",
              color: "#0969DA",
            },
          }}
        >
          {post.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: "light", mt: 1, mb: 1, p: 2 }}
        >
          {post.description}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: "light", mt: 1, mb: 1, color: "gray", p: 2 }}
        >
          {new Date(post.createdAt).toDateString()}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ProfilePosts;
