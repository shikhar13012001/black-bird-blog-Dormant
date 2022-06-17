// pages/posts/[id].js
import React from "react";
import { API, Storage, Auth, withSSRContext } from "aws-amplify";
import { useState, useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { listPosts, getPost } from "../../src/graphql/queries";
import {
  Chip,
  Container,
  Divider,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import Button from "@mui/material/Button";
import { postsByUsername } from "../../src/graphql/queries";
import { updatePost } from "../../src/graphql/mutations";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import MoreFromUsers from "../../components/MoreFromUsers";
import Comments from "../../components/Comments";
import RichTextEditor from "../../components/RichTextEditor";
import { userDetailByUsername } from "../../src/graphql/queries";
import { readingTime } from "reading-time-estimator";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import Like from "../../components/Likes";
import { RiUserAddFill } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import { updateUserAttributes } from "../../src/graphql/mutations";
let style = {
  Image: {
    objectFit: "cover",
    objectPosition: "center",
    objectRepeat: "no-repeat",
    width: 0,
    height: "auto",
    margin: "auto",
    display: "flex",
    marginTop: 10,
  },
  Box: {
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "space-evenly",
  },
  BoxWrapper: {
    backgroundColor: "#22272E",
    width: "100%",
    position: "relative",
  },
};
export default function Post({ post }) {
  // const router = useRouter();
  console.log(post);
  const width = useMediaQuery("(max-width:600px)") ? "100%" : "60%";
  const [Likes, setLikes] = useState(post.likes);
  const [coverImage, setCoverImage] = useState(null);
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userDetails, setUserDetails] = React.useState({});
  const [follow, setFollow] = React.useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    const { username } = post;
    const postData = await API.graphql({
      query: postsByUsername,
      variables: {
        username,
        sort: { field: "createdAt", direction: "desc" },
        limit: 2,
      },
    });
    setPosts(postData.data.postsByUsername.items);
  }
  useEffect(() => {
    updateCoverImage();
    fetchCurrentUser();
  }, []);
  // fetch user attributes

  async function updateCoverImage() {
    if (post.coverImage) {
      const imageKey = await Storage.get(post.coverImage);
      setCoverImage(imageKey);
      // set userImage
    }
    const userDetails = await API.graphql({
      query: userDetailByUsername,
      variables: {
        username: post.username,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    setUserDetails(userDetails);

    const userImage =
      userDetails.data.UserDetailByUsername.items[0]?.profileImage;
    if (userImage) {
      const userImageKey = await Storage.get(userImage);
      console.log(userImageKey);
      setImage(userImageKey);
    }
  }
  const fetchCurrentUser = async () => {
    const currentUser = await Auth.currentUserInfo();
    console.log("currentUser", currentUser);
    const userDataCurrent = await API.graphql({
      query: userDetailByUsername,
      variables: { username: currentUser.username },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    setUserDetails(userDataCurrent);
    setFollow(
      userDataCurrent.data.UserDetailByUsername.items[0]?.follow.includes(
        post.username
      )
    );
  };

  const handleFollow = async () => {
    const { username } = post;
    const follow = userDetails.data.UserDetailByUsername.items[0].follow || [];
    const userId = userDetails.data.UserDetailByUsername.items[0].id;
    if (follow?.includes(username)) {
      setFollow(false);
      console.log("already following");
      const updatedFollow = follow.filter((item) => item !== username);
      console.log(updatedFollow);
      const updatedUser = await API.graphql({
        query: updateUserAttributes,
        variables: {
          input: {
            id: userId,
            follow: updatedFollow,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log(updatedUser);
      const obj = {};
      obj["data"] = {};
      obj["data"]["UserDetailByUsername"] = {};
      obj["data"]["UserDetailByUsername"]["items"] = [];
      obj["data"]["UserDetailByUsername"]["items"][0] = {
        follow: updatedUser.data.updateUserAttributes.follow,
        id: userId,
      };
      console.log("obj", obj);
      setUserDetails(obj);
    } else {
      console.log("following");
      setFollow(true);

      const updatedFollow = [...follow, username];
      console.log(updatedFollow);
      const updatedUser = await API.graphql({
        query: updateUserAttributes,
        variables: {
          input: {
            id: userId,
            follow: updatedFollow,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log(updatedUser);
      const obj = {};
      obj["data"] = {};
      obj["data"]["UserDetailByUsername"] = {};
      obj["data"]["UserDetailByUsername"]["items"] = [];
      obj["data"]["UserDetailByUsername"]["items"][0] = {
        follow: updatedUser.data.updateUserAttributes.follow,
        id: updatedUser.data.updateUserAttributes.id,
      };
      console.log("obj", obj);
      setUserDetails(obj);
    }
  };
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Box sx={{ ...style.BoxWrapper }}>
        <Box
          sx={{
            display: "flex",
            margin: "auto",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "80%",
            mb: 4,
          }}
        >
          {post.postTags &&
            post.postTags.map((tag, index) => {
              return (
                <Link href={`/tags/${tag}`} key={index}>
                  <Chip
                    label={tag}
                    className="tag-lines"
                    sx={{
                      mr: 1,
                      bgcolor: "#ADBABE",
                      cursor: "pointer",
                    }}
                  />
                </Link>
              );
            })}
        </Box>
        <Box>
          <Typography
            variant="h1"
            fontSize={{
              lg: 96,
              md: 70,
              sm: 50,
              xs: 30,
            }}
            sx={{
              display: "flex",
              margin: "auto",
              fontWeight: "bold",
              color: "white",
              textTransform: "capitalize",
              width: "90%",
            }}
          >
            {post.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "white",
              display: "flex",
              m: "auto",
              width: "90%",
            }}
          >
            {readingTime(post.content).text}
          </Typography>
          <Typography
            variant="p"
            fontSize={{
              lg: 24,
              md: 18,
              sm: 14,
              xs: 12,
            }}
            sx={{
              display: "flex",
              p: 2,
              margin: "auto",
              fontWeight: "light",
              color: "gray",
              textTransform: "capitalize",
              width: "90%",
            }}
          >
            {post.description}
          </Typography>
        </Box>
        {coverImage && (
          <img
            src={coverImage}
            alt="coverImage"
            className="shadow-lg"
            style={{ ...style.Image, width }}
          />
        )}
      </Box>

      <Container
        sx={{ width: "100%", display: "grid", placeContent: "center" }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            mb: 3,
            mt: 3,
          }}
        >
          <img
            src={
              image ||
              `https://avatars.dicebear.com/api/initials/${post.username}.svg`
            }
            onError={(e) => {
              e.target.src = `https://avatars.dicebear.com/api/initials/${post.username}.svg`;
            }}
            alt="userImage"
            className="shadow-lg"
            style={{ width: 80, height: 80, borderRadius: "50%" }}
          />
          <Typography variant="body1" sx={{ fontWeight: "bold", ml: 2 }}>
            {post.username}
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
          <Typography
            variant="body1"
            sx={{ fontWeight: "light", ml: 2, color: "gray", ml: "auto" }}
          >
            {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        <Button
          variant="filled"
          sx={{
            backgroundColor: !follow ? "#408fff" : "#0969DA",
            maxWidth: "20em",
            mb: 6,
            color: "white",
            "&:hover": {
              color: "black",
            },
          }}
          fullWidth
          onClick={handleFollow}
        >
          {follow ? (
            <MdVerified color="white" />
          ) : (
            <RiUserAddFill color="white" />
          )}{" "}
          {follow ? "Following" : "Follow"}
        </Button>
        <Divider />

        <RichTextEditor readOnly value={post.content} />
        {/* <ReactMarkdown className="prose">{post.content}</ReactMarkdown> */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ mb: 3, mt: 5, width: "100%" }}
        ></Stack>
        <Like counters={post.reactions || []} id={post.id} />
      </Container>

      <Divider sx={{ bgcolor: "black", width: "100%" }} />
      <Container>
        <Typography
          variant="h3"
          className="text-12xl mt-3 my-3 font-bold"
          fontSize={{
            lg: 96,
            md: 70,
            sm: 50,
            xs: 30,
          }}
          sx={{
            mt: 6,
            mb: 5,
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
          }}
        >
          More from {post.username}
        </Typography>
        <Grid
          container
          columns={16}
          sx={{ display: "flex", justifyContent: "space-around" }}
        >
          {posts.map((post, index) => (
            <MoreFromUsers post={post} key={index} />
          ))}
        </Grid>
        <Divider sx={{ bgcolor: "black", width: "100%", mt: 5, mb: 3 }} />
        {/* <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        /> */}
        {/* <div className="comments"></div> */}

        <Comments post={post} />
      </Container>
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  // const router = useRouter();
  const { id } = query;
  console.log(id);
  const SSR = withSSRContext({ req });
  const { data } = await SSR.API.graphql({
    query: getPost,
    variables: {
      id: id,
    },
  });

  return {
    props: {
      post: data.getPost,
    },
  };
}
