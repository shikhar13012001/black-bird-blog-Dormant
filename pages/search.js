import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { API } from "aws-amplify";
import { searchPosts } from "../src/graphql/queries";
import { Container, Typography } from "@mui/material";
import FeedPost from "../components/FeedPost";
const Search = () => {
  const { query } = useRouter();
  const [posts, setPosts] = useState([]);
  React.useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    try {
      const result = await API.graphql({
        query: searchPosts,
        variables: {
          filter: {
            title: {
              wildcard: `*${query.q}*`,
            },
          },
        },
      });
      console.log(result.data.searchPosts);
        setPosts(result.data.searchPosts.items);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container sx={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        <Typography variant="h1" sx={{fontWeight:"bold",mt:5}}>
            Search results for <span style={{color:'blue'}}>{query.q}</span>
            </Typography>
      {posts.map((post, index) => {
        return <FeedPost key={index} post={post} />;
      })}
    </Container>
  );
};

export default Search;
