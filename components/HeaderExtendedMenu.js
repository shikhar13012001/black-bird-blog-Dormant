import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Typography } from "@mui/material";
import { Tags } from "../utils/constants";
import Image from "next/image";
import Link from "next/link";
import { GoTag } from "react-icons/go";
import { AiFillTags } from "react-icons/ai";
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
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography variant="h3" sx={{ textAlign: "center", mt: 3 }}>
        Choose by Tag
      </Typography>
      <List
        sx={{
          display: "flex",
          flexWrap: "wrap",
          mt: 5,
          justifyContent: "center",
          gap: 5,
        }}
      >
        {Tags.map((text, index) => (
          <Link href={`/tags/${text}`} key={index}>
            <ListItem button key={text} sx={{ width: "10em" }}>
              <ListItemIcon>
                <Image
                  src={`https://avatars.dicebear.com/api/identicon/${text}.svg`}
                  width={25}
                  height={25}
                />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Typography
            sx={{ mr: 2.5, cursor: "pointer" }}
            onClick={toggleDrawer(anchor, true)}
          >
            {" "}
            <AiFillTags /> Tags
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
