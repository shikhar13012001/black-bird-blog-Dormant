import { Amplify } from "aws-amplify";
import "../styles/globals.css";
// import "../configureAmplify";
import Link from "next/link";
import { Authenticator } from "@aws-amplify/ui-react";
import { useState, useEffect, useRef } from "react";
import { Auth, Hub } from "aws-amplify";
import Announcement from "../components/Announcement";
import "@aws-amplify/ui-react/styles.css";
import Footer from "../components/footer";
import { NotificationsProvider } from "@mantine/notifications";
import Logo from "../public/logo.png";
import Image from "next/image";
import HeaderExtendedMenu from "../components/HeaderExtendedMenu";
import CategoryExtendedMenu from "../components/CategoryExtendedMenu";
import AOS from "aos";
import "animate.css";
import "aos/dist/aos.css";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { IconContext } from "react-icons";
import NavBar from "../components/NavBar";
import { GoMarkdown, GoTag } from "react-icons/go";
import { CgFeed, CgProfile } from "react-icons/cg";
import SEO from "../components/SEO";
import { ImBlog } from "react-icons/im";
import config from "../aws-exports";
Amplify.configure({ ...config, ssr: true });

function MyApp({ Component, pageProps }) {
  const [signedInUser, setSignedInUser] = useState(false);
  useEffect(() => {
    authListener();
  }, []);
  useEffect(() => {
    window.addEventListener("load", function () {
      AOS.init();
    });
  }, []);

  async function authListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          return setSignedInUser(true);
        case "signOut":
          return setSignedInUser(false);
      }
    });
    try {
      await Auth.currentAuthenticatedUser();
      setSignedInUser(true);
    } catch (err) {}
  }
  const theme = createTheme();
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div style={{ minHeight: "100vh" }}>
          <Announcement />
          <IconContext.Provider
            value={{
              color: "gray",
              style: { marginRight: "10px" },
              size: "1.6em",
            }}
          >
            <NotificationsProvider>
              <ThemeProvider theme={theme}>
                <div style={{ minHeight: "90vh" }}>
                  <SEO />

                  {window.innerWidth > 800 ? (
                    <nav className="p-6 border-b border-gray-300 items-center flex">
                      <Link href="/">
                        <span className="mr-auto cursor-pointer">
                          <Image src={Logo} alt="logo" className="w-12" />
                        </span>
                      </Link>
                      <Link href="/create-post">
                        <span className="mr-6 cursor-pointer">
                          <GoMarkdown />
                          Create Post
                        </span>
                      </Link>
                      <HeaderExtendedMenu />
                      <CategoryExtendedMenu />
                      <Link href="/profile">
                        <span className="mr-6 cursor-pointer">
                          <CgProfile />
                          Profile
                        </span>
                      </Link>
                      <Link href="/Feed">
                        <span className="mr-6 cursor-pointer">
                          <CgFeed />
                          Feed
                        </span>
                      </Link>
                      {signedInUser && (
                        <Link href="/my-posts">
                          <span className="mr-6 cursor-pointer">
                            <ImBlog />
                            My Posts
                          </span>
                        </Link>
                      )}
                    </nav>
                  ) : (
                    <nav className="p-6 border-b border-gray-300 items-center flex">
                      <Link href="/">
                        <span className="mr-auto cursor-pointer">
                          <Image src={Logo} alt="logo" className="w-12" />
                        </span>
                      </Link>
                      <NavBar />
                    </nav>
                  )}
                  <Component {...pageProps} />
                </div>
              </ThemeProvider>
            </NotificationsProvider>
          </IconContext.Provider>
          <Footer />
        </div>
      )}
    </Authenticator>
  );
}

export default MyApp;
