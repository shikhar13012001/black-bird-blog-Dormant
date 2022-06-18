// pages/index.js
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { API, Storage, Auth, graphqlOperation } from "aws-amplify";
import { listPosts } from "../src/graphql/queries";
import "@aws-amplify/ui-react/styles.css";
import {
  Paper,
  Box,
  Container,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import Post from "../components/Post";
import Banner from "../components/Banner";
import Disclaimer from "../components/Disclaimer";
import BuiltUsing from "../components/BuiltUsing";
import CircularHeading from "../components/CircularHeading";
import * as THREE from "three";
import BIRDS from "vanta/dist/vanta.birds.min";
import Team from "../components/Team";
import Article from "../components/ArticleofWeek";
const style = {
  Container: {
    width: "100%",
  },
  Paper: {
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: 350,
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      cursor: "pointer",
    },
  },
  Box: {
    display: "grid",
    placeContent: "center",
    backgroundColor: "white",
    width: 340,
    height: 340,
    p: 2,
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.1)",
      transition: "all 0.2s ease-in-out",
    },
  },
  Feed: {
    mt: 10,
    height: 40,
    display: "flex",
    margin: "auto",
    width: "25em",
    bgcolor: "black",
    color: "white",
    "&:hover": {
      cursor: "pointer",
      color: "black",
    },
  },
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: myRef.current,
          backgroundColor: "white",
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: true,
          minHeight: 600.0,
          minWidth: 100,
          backgroundColor: 0xffffff,
          colorMode: "lerp",
          color1: "black",
          color2: "white",
          speedLimit: 5.0,
          separation: 20.0,
          alignment: 20.0,
          cohesion: 20.0,
          quantity: 4,
          birdSize: 1,
          wingSpan: 20,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    const postData = await API.graphql({
      query: listPosts,
      variables: {
        sort: "+createdAt",
        limit: 6,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    const { items } = postData.data.listPosts;
    // Fetch images from S3 for posts that contain a cover image
    const postsWithImages = await Promise.all(
      items.map(async (post) => {
        if (post.coverImage) {
          post.coverImage = await Storage.get(post.coverImage);
        }
        return post;
      })
    );
    console.log(postsWithImages);
    setPosts(postsWithImages);
  }
  return (
    <div>
      <a
        className="github-fork-ribbon"
        href="https://github.com/shikhar13012001/BlackBird"
        data-ribbon="Fork me on GitHub"
        title="Fork me on GitHub"
      >
        Fork me on GitHub
      </a>
      <Banner />
     
      <Divider sx={{ mb: 3 }} />
      <Typography
        fontSize={{
          lg: 128,
          md: 96,
          sm: 72,
          xs: 48,
        }}
        data-aos="zoom-in-up"
        variant="h1"
        sx={{ fontWeight: "bold", textAlign: "center", mt: 10 }}
      >
        Create Creative Content
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center", mt: 3 }}>
        @BlackBird is home to thousand's of post related to tech, business,
        design.
        <br />
        You can also create your own story and share it with the world.
        <br />
        <span>Join</span> us and create something amazing.
        <br />
      </Typography>
      <Team />
      <div className="scroll" data-aos="fade-up"></div>
      <Container style={style.Container}>
        <Typography
          variant="h2"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          fontSize={{
            lg: 128,
            md: 96,
            sm: 72,
            xs: 48,
          }}
          sx={{ fontWeight: "bold", textAlign: "center", mt: 10, mb: 10 }}
        >
          Our recent Posts.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {posts.map((post, index) => (
            <Post post={post} key={post.id} styles={style} />
          ))}
        </Box>
        <Button variant="filled" color="primary" sx={style.Feed}>
          <Link href="/Feed">view Feed</Link>
        </Button>
      </Container>
      <Article />
      <Box
        sx={{ position: "relative", width: "100%", minHeight: "100vh", mt: 20 }}
        data-aos="fade-up"
        ref={myRef}
      >
        <div className="wrapper" style={{ marginTop: 10 }}>
          <CircularHeading
            text="@ BlackBird is Forceful Natural beautiful"
            arc={270}
            radius={340}
          />
        </div>
      </Box>
      <Disclaimer />
      <BuiltUsing />
    </div>
  );
}
