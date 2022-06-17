import React, { useEffect } from "react";
import { API, Storage } from "aws-amplify";
import Link from "next/link";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
const MoreFromUsers = ({ post }) => {
  const [image, setImage] = React.useState(null);
  const [userImage, setUserImage] = React.useState(null);
  console.log("Morefrom users", post);

  const { username, likes, title } = post;
  useEffect(() => {
    FetchImage();
    FetchUserImage();
  }, []);
  const FetchImage = async () => {
    if (post.coverImage) {
      const imageKey = await Storage.get(post.coverImage);
      setImage(imageKey);
    }
  };
  // fetch user image
  const FetchUserImage = async () => {
    const imageKey = await Storage.get(post.userImage);
    setUserImage(imageKey);
  };

  return (
    <Grid
      item
      xs={12}
      sm={12}
      lg={7.5}
      md={7.5}
      className="shadow-md rounded-lg overflow-hidden"
      sx={{ padding: 1, mt: 3, border: "1px solid black", minHeight: "25em" }}
    >
      {/* <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {post.postTags.splice(0, 1).map((tag, index) => {
          return <Chip key={index} label={tag} sx={{ width: "8em" }} />;
        })}
      </Box> */}
      <Typography variant="p" sx={{ fontWeight: "bold" }}>
        Community
      </Typography>
      <Typography
        variant="h4"
        fontSize={{
          lg: 64,
          md: 48,
          sm: 32,
          xs: 16,
        }}
        sx={{
          mt: 2,
          p: 2,
          fontWeight: "bold",
          "&:hover": {
            color: "#007aff",
            cursor: "pointer",
            textDecoration: "underline",
          },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="p"
        fontSize={{
          lg: 18,
          md: 18,
          sm: 14,
          xs: 12,
        }}
        component="h6"
        sx={{ color: "gray", ml: 3, mr: 3 }}
      >
        {post.description.substring(0, Math.min(post.description.length, 150))}
        ...
      </Typography>
      <Grid container direction="row" alignItems="center" sx={{ ml: 2, mt: 3 }}>
        <Grid item sx={{ mr: 3 }}>
          <img
            src={
              userImage ||
              `https://avatars.dicebear.com/api/initials/${post.username}.svg`
            }
            alt="coverImage"
            className="shadow-lg"
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              border: "1px solid black",
            }}
            onError={(e) => {
              e.target.src = `https://avatars.dicebear.com/api/initials/${post.username}.svg`;
            }}
          />
        </Grid>
        <Grid item>
          <Typography
            fontSize={{
              lg: 25,
              md: 24,
              sm: 18,
              xs: 16,
            }}
            variant="h6"
            sx={{
              color: "gray",
              ml: 2,
              // hover
            }}
          >
            {post.username}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="p"
            sx={{ color: "gray", p: 3, fontSize: "0.875rem" }}
          >
            {new Date(post.createdAt).toDateString()}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MoreFromUsers;
