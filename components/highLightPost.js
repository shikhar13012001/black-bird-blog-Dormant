import React, { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Auth, Storage } from "aws-amplify";
import { useMediaQuery } from "@mui/material";
import { readingTime } from "reading-time-estimator";
import Link from "next/link";
const HighLightPost = ({ post, image }) => {
  console.log(post);
  const [coverImage, setCoverImage] = useState(null);
  const isMobile = useMediaQuery("(max-width:800px)");
  useEffect(() => {
    //fetch post cover image
    if (post?.coverImage) {
      Storage.get(post.coverImage).then((url) => {
        setCoverImage(url);
      });
    }
    // clean up
    return () => {
      setCoverImage(null);
    };
  }, [post?.coverImage]);

  return (
    <Grid container columns={12} sx={{ minHeight: "25em", mt: 3, mb: 8 }}>
      <Grid item xs={12} sm={12} md={4} lg={4} sx={{ mr: 2 }}>
        <Typography
          variant="h3"
          fontSize={{
            lg: "2.5rem",
            md: "2rem",
            sm: "2rem",
            xs: "2rem",
          }}
          sx={{ fontWeight: "bold", mt: 4, mb: 2 }}
        >
          {post && post.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          by {post && post.username}
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", display: "flex" }}>
          {post && readingTime(post.content).text}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "light", mt: 1, mb: 4 }}>
          {post && post.description}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: "light", mt: 4, mb: 4, color: "gray" }}
        >
          {post && new Date(post.createdAt).toDateString()}
        </Typography>
        <Link href={`/posts/${post?.id}`}>
          <Button
            variant="filled"
            fullWidth
            sx={{ mt: 4, mb: 3, bgcolor: "#0051ff", color: "white" }}
          >
            Read More
          </Button>
        </Link>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={7}
        lg={7}
        sx={{
          backgroundImage: `url(${
            coverImage ||
            "https://github.blog/wp-content/uploads/2022/03/break-the-code-2.png?resize=1200%2C630"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: isMobile ? 400 : null,
          backgroundRepeat: "no-repeat",
        }}
      ></Grid>
    </Grid>
  );
};

export default HighLightPost;
