import { Box, Button, Container, Divider, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API, Storage, Auth } from "aws-amplify";
import {
  postsByUsername,
  userDetailByUsername,
} from "../../src/graphql/queries";
import ProfilePosts from "../../components/ProfilePosts";
import { RiUserAddFill } from "react-icons/ri";
import Highlight from "../../components/highLightPost";
import { updateUserAttributes } from "../../src/graphql/mutations";
import { MdVerified } from "react-icons/md";
const UserPage = () => {
  const [image, setImage] = useState(null);
  const router = useRouter();
  const { username } = router.query;
  console.log("username", username);
  const [posts, setPosts] = useState([]);
  const [postObject, setPostObject] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [follow, setFollow] = useState(false);
  console.log(posts);
  useEffect(() => {
    if (!username) return;
    fetchPosts();
    fetchUserAttributes();
    // clean up
    return () => {
      setPosts([]);
    };
  }, [username]);
  const handleFollow = async () => {
    const userId = userDetails.data.UserDetailByUsername.items[0].id;
    const follow = userDetails.data.UserDetailByUsername.items[0].follow || [];
    if (follow?.includes(username)) {
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
        id: updatedUser.data.updateUserAttributes.id,
      };

      console.log("obj", obj);
      setUserDetails(obj);
      setFollow(false);
    } else {
      console.log("following");
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
      setFollow(true);
    }
  };
  async function fetchPosts() {
    const postData = await API.graphql({
      query: postsByUsername,
      variables: {
        username,
        // sort by date created
        sort: {
          field: "createdAt",
          direction: "desc",
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    let PostObject = {};
    let posts = postData.data.postsByUsername.items;
    posts.map((post) => {
      post.Category?.map((categoryItem) => {
        PostObject[categoryItem] = PostObject[categoryItem] || [];
        PostObject[categoryItem].push(post);
      });
    });
    setPosts(postData.data.postsByUsername.items);
    setPostObject(PostObject);
  }
  async function fetchUserAttributes() {
    const userData = await API.graphql({
      query: userDetailByUsername,
      variables: { username: username },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    const currentUser = await Auth.currentUserInfo();
    console.log("currentUser", currentUser);
    const userDataCurrent = await API.graphql({
      query: userDetailByUsername,
      variables: { username: currentUser.username },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    setUserDetails(userDataCurrent);
    console.log("userdetails", userDataCurrent.data.UserDetailByUsername);
    // console.log(userData.data.UserDetailByUsername.items);
    const imageKey = await Storage.get(
      userData.data.UserDetailByUsername.items[0].profileImage
    );
    const following =
      userDataCurrent.data.UserDetailByUsername.items[0].follow || [];
    setFollow(following.includes(username));
    setImage(imageKey);
  }
  return (
    <Container sx={{ width: "100%" }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "light", mt: 10, color: "gray" }}
      >
        Posts by
      </Typography>
      <Typography
        variant="h1"
        fontSize={{
          lg: "4.4rem",
          md: "4rem",
          sm: "3rem",
          xs: "3rem",
        }}
        sx={{
          fontWeight: "bold",
          mt: 1,
          display: "flex",
          flexWrap: "wrap-reverse",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {username}
        {image && (
          <img
            src={image}
            onError={
              // set random image if user has no profile image
              (e) => {
                e.target.src = "https://source.unsplash.com/random/300x300";
              }
            }
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              marginBottom: 10,
            }}
          />
        )}
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontWeight: "light", mt: 1, color: "#0969DA" }}
      >
        @{username}
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontWeight: "light", mt: 2, mb: 2, color: "gray" }}
      >
        {posts.length} posts
      </Typography>
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
      {/* first post should be big */}
      {Object.keys(postObject)
        .sort()
        .map((category, i) => (
          <Box key={i}>
            <Divider />
            <Typography
              fontSize={{
                lg: "5rem",
                md: "4.6rem",
                sm: "3.5rem",
                xs: "3.4rem",
              }}
              variant="h3"
              sx={{ fontWeight: "bold", mt: 2 }}
            >
              {category}
            </Typography>
            <Highlight post={postObject[category][0]} />

            <Divider />
            <Box
              className="flex"
              flexWrap
              sx={{
                display: "flex",
                flexWrap: "wrap",
                minHeight: "fit-content",
                gap: 3,
              }}
            >
              {postObject[category]?.slice(1)?.map((post) => (
                <ProfilePosts post={post} key={post.id} />
              ))}
            </Box>
          </Box>
        ))}
    </Container>
  );
};
export default UserPage;
