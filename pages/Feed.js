import React from "react";
import { Auth, Storage, API, graphqlOperation } from "aws-amplify";
import { listPosts } from "../src/graphql/queries";
import Strip from "../components/Stripes";
import { Container, Divider } from "@mui/material";
import { Tags } from "../utils/constants";
import FeedPost from "../components/FeedPost";
import { Typography } from "@mui/material";
import HighLightPost from "../components/highLightPost";
//list all posts

const Feed = () => {
  //list all post
  const [posts, setPosts] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    async function fetchPosts() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
        const result = await API.graphql(
          graphqlOperation(listPosts, {
            sort: "-createdAt",
          })
        );
        console.log(result);
        const PostObj = {};
        const posts = result.data.listPosts.items;
        Tags.map((tag) => {
          posts.map((post) => {
            if (post.Category?.includes(tag)) {
              PostObj[tag] = PostObj[tag] || [];
              PostObj[tag].push(post);
            }
          });
        });
        console.table(PostObj);
        setPosts(PostObj);
      } catch (err) {
        console.log(err);
        setError(err);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <Container sx={{ position: "relative" }}>
      <Typography variant="h1" sx={{ fontWeight: "bold", mt: 5 }}>
        Your Daily Feed
      </Typography>
      {Object.keys(posts)
        .sort()
        .map((Tag, index) => {
          return (
            <React.Fragment key={index}>
              <Typography
                key={index}
                variant="h2"
                fontSize={{
                  lg: "3.8rem",
                  md: "3rem",
                  sm: "3rem",
                  xs: "2.5rem",
                }}
                sx={{ fontWeight: "bold", mt: 10 }}
              >
                {Tag}
              </Typography>
              <HighLightPost
                post={
                  posts[Tag].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                  )[0]
                }
              />
              <Divider sx={{ m: 5 }} />

              <Container sx={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {posts[Tag].sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                )
                  .slice(1)
                  .map((post, index) => {
                    return <FeedPost key={index} post={post} />;
                  })}
              </Container>
            </React.Fragment>
          );
        })}
    </Container>
  );
};

export default Feed;
