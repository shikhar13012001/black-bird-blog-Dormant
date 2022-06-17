import React, { useState, useEffect } from "react";
import { listPosts } from "../../src/graphql/queries";
import { API, Storage, withSSRContext } from "aws-amplify";
import { Tags } from "../../utils/constants";
import { Box, Container, Typography, Divider } from "@mui/material";
import Post from "../../components/Post";

const PostWithTag = ({ post: PostObjectArray, tag }) => {
  // duplicate PostObjectArray
  const [posts, setPostsWithImages] = useState([]);
  console.log(PostObjectArray, "PostObjectArray");
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    // fetch all images in PostArrayObject and set post to this
    const PostwithImages = await Promise.all(
      PostObjectArray.map(async (post) => {
        if (post.coverImage) {
          const image = await Storage.get(post.coverImage);
          post.coverImage = image;
          return post;
        }
      })
    );
    console.log(PostwithImages);
    setPostsWithImages(PostwithImages);
  }

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", pr: 5, pl: 5 }}>
      <Typography
        variant="h6"
        color={"grey"}
        sx={{
          position: "relative",
          width: "60%",
          display: "flex",
          margin: "auto",
          mt: 5,
        }}
      >
        Tag
      </Typography>
      <Typography
        variant="h1"
        sx={{
          position: "relative",
          width: "60%",
          display: "flex",
          margin: "auto",
          mb: 1,
        }}
      >
        {tag}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          position: "relative",
          color: "gray",
          width: "60%",
          display: "flex",
          margin: "auto",
          mb: 10,
        }}
      >
        {posts.length} Posts
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
        }}
      >
        {posts.map((post, index) => (
          <Post post={post} tag={tag} key={index} />
        ))}
      </Box>
    </Box>
  );
};
export default PostWithTag;

export async function getServerSideProps({ query, req }) {
  const SSR = withSSRContext({ req });
  const { tag } = query;
  const postData = await SSR.API.graphql({
    query: listPosts,
    variables: {
      filter: {
        postTags: {
          contains: tag,
        },
      },
    },
  });
  return {
    props: {
      post: postData.data.listPosts.items,
      tag: tag,
    },
  };
}
