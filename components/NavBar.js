import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import { Tags } from "../utils/constants";
import Image from "next/image";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryExtendedMenu from "../components/CategoryExtendedMenu";
import TagsExtendedMenu from "../components/HeaderExtendedMenu";
import CloseIcon from "@mui/icons-material/Close";
import { GoMarkdown, GoTag } from "react-icons/go";
import { CgFeed, CgProfile } from "react-icons/cg";
import { BiCategoryAlt } from "react-icons/bi";
import { ImBlog } from "react-icons/im";
export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  // make sets of 6 tags and make a list of them
  const tagSet = [];
  for (let i = 0; i < Tags.length; i += 6) {
    tagSet.push(Tags.slice(i, Math.min(Tags.length, i + 6)));
  }
  console.log(tagSet, Tags.length);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography variant="h3" sx={{ textAlign: "center", mt: 3 }}>
        <CloseIcon onClick={toggleDrawer(anchor, false)} /> Menu
      </Typography>
      <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Link href="/create-post">
          <ListItem button sx={{ p: 1 }}>
            <GoMarkdown /> Create Post
          </ListItem>
        </Link>

        <ListItem button sx={{ p: 1 }}>
          <GoTag /> <TagsExtendedMenu />
        </ListItem>
        <ListItem button sx={{ p: 1 }}>
          <BiCategoryAlt /> <CategoryExtendedMenu />
        </ListItem>
        <Link href="/profile">
          <ListItem button sx={{ p: 1 }}>
            <CgProfile /> Profile
          </ListItem>
        </Link>
        <Link href="/Feed">
          <ListItem button sx={{ p: 1 }}>
            <CgFeed /> Feed
          </ListItem>
        </Link>
        <Link href="/my-posts">
          <ListItem button sx={{ p: 1 }}>
            <ImBlog /> My Posts
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Typography
            sx={{ mr: 2.5, cursor: "pointer" }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </Typography>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
