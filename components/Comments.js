import React from "react";
import {
  Typography,
  TextField,
  Paper,
  Button,
  useMediaQuery,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import { createComment } from "../src/graphql/mutations";
import { API } from "aws-amplify";
import { v4 as uuid } from "uuid";
import emailjs from "@emailjs/browser";
import RichTextEditor from "./RichTextEditor";
import { Auth } from "aws-amplify";
import { useNotifications } from "@mantine/notifications";
import { CheckIcon } from "@modulz/radix-icons";
// import thumbupicon from mui
import CommentInput from "./CommentSystem";
import CommentLike from "./CommentLike";
import _ from "lodash";
const CommentList = ({ comments }) => {
  return (
    <React.Fragment>
      {comments.map((comment, index) => {
        console.log("comment", comment.reactions);
        return (
          <Paper
            key={index}
            style={{ width: "100%" }}
            elevation={0}
            sx={{ borderRadius: 1, minHeight: "3.5em", mt: 1, mb: 2, p: 2 }}
          >
            <Typography variant="body1" style={{ color: "grey" }}>
              {comment.username}
            </Typography>
            <RichTextEditor readOnly={true} value={comment.content} />
            <Typography variant="caption" style={{ color: "grey" }}>
              {new Date(comment.createdAt).toLocaleString()}
            </Typography>
            <CommentLike
              counters={comment.commentReactions || []}
              id={comment.id}
            />
          </Paper>
        );
      })}
    </React.Fragment>
  );
};
const Comments = ({ post }) => {
  const isMobile = useMediaQuery("(min-width:600px)");
  console.log("posst", post);
  const Notifications = useNotifications();
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState(
    post?.comments?.items?.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
  );
  const handleChange = _.debounce((e) => {
    setComment(e);
  });
  const showNotification = ({ title, message, loading }) =>
    Notifications.showNotification({
      title: title || "Your comment was posted",
      message: message || "Hey there, your comment is awesome!",
      color: "teal",
      icon: <CheckIcon />,
      loading: loading,
    });

  console.log("comments", comments);
  console.log("comment", comment);
  const handleSubmit = async (e) => {
    e.preventDefault();
    showNotification({
      loading: true,
      title: "Your comment is being posted",
      message: "Please wait while we post your comment",
      action: "Posting comment",
    });

    const currentUser = await Auth.currentUserInfo();
    const { username } = currentUser;
    const Comment = await API.graphql({
      query: createComment,
      variables: {
        input: {
          id: uuid(),
          postId: post.id,
          content: comment,
          username: username,
          commentReactions: [],
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    setComments([Comment.data.createComment, ...comments]);
    setComment("");
    showNotification({
      loading: false,
      title: "Your comment was posted",
      message: "Hey there, your comment is awesome!",
    });
    emailjs.send(
      "service_whcdmqo",
      "template_0nv09eh",
      {
        to_email: post.email,
        to_name: post.username,
        reply_to: "BlackBird.io",
        message: `${username} commented on your post. Check it out`,
        my_html: `<a href="https://black-bird-shikhar13012001.vercel.app/posts/${post.id}"><div style="background-image:url("https://serving.photos.photobox.com/4598834156fea5ae7a2331892a5c88f78f40fd06a3c6a566deb35895b32772d7cebf590f.jpg");width:100px;height:40px;color:white;border-radius:10px;">Check it out</div></a>`,
      },
      "4-Ap7gXtWF3uTs0tQ"
    );
  };

  return (
    post && (
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h6"
          className="text-2xl font-semibold tracking-wide text-left"
          sx={{ width: "100%", mt: 2, mb: 1, fontWeight: 600 }}
        >
          Drop a comment
        </Typography>
        <Box component="form" sx={{ width: "100%" }} onSubmit={handleSubmit}>
          <CommentInput comment={comment} setComment={handleChange} />
          <Button
            type="submit"
            variant="filled"
            endIcon={<SendIcon />}
            fullWidth={!isMobile}
            sx={{
              mt: 2,
              mb: 3,
              backgroundColor: "#000000",
              color: "white",
              "&:hover": {
                color: "black",
                backgroundColor: "grey",
              },
            }}
          >
            Send
          </Button>
        </Box>
        <CommentList comments={comments} />
      </Box>
    )
  );
};

export default Comments;
