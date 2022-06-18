// pages/create-post.js.
import { Authenticator } from "@aws-amplify/ui-react";
import { useState, useRef } from "react"; // new
import { API, Storage, Auth } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { createPost } from "../src/graphql/mutations";
import Alert from "../components/Alert";
import RichTextEditor from "../components/RichTextEditor";
import { userDetailById } from "../src/graphql/queries";
import { useNotifications } from "@mantine/notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Tags } from "../utils/constants";
import { Container, Typography, Box, TextField } from "@mui/material";
import { MultiSelect } from "@mantine/core";
import ImageIcon from "@mui/icons-material/Image";
import PublishIcon from "@mui/icons-material/Publish";
import { handleImageUpload } from "../utils/FileUpload";
import _ from "lodash";
// import '@aws-amplify/ui-react/styles.css';

function CreatePost() {
  const initialState = { title: "", content: "" };
  const [disable, setDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState([]);
  const [post, setPost] = useState(initialState);
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);
  const { title, content, description } = post;
  const router = useRouter();
  const onChange = (e) => {
    setPost((t) => ({ ...t, [e.target.name]: e.target.value }));
  };
  const notifications = useNotifications();

  const showNotification = (props) =>
    notifications.showNotification({
      title: props.title || "Your Post is publishing",
      message:
        props.message ||
        "This could take a while, please wait while we publish your post",
      loading: props.loading,
    });
  const createNewPost = async () => {
    if (!title || !content || !description || !image) {
      setOpen(true);
      return;
    }
    const id = uuid();
    setDisable(true);
    showNotification({ loading: true });
    post.id = id;
    //settags here
    //current username
    const currentUser = await Auth.currentUserInfo();
    const { username } = currentUser;
    const { email } = currentUser.attributes;

    console.log(currentUser);
    console.log(username, email);
    // If there is an image uploaded, store it in S3 and add it to the post metadata
    if (image) {
      const fileName = `${image.name}_${uuid()}`;
      post.coverImage = fileName;
      console.log(fileName, image);
      await Storage.put(fileName, image);
    }
    //get userImage
    const userDetails = await API.graphql({
      query: userDetailById,
      variables: {
        userId: currentUser.id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    // get a random userImage
    const userImage =
      userDetails.data.UserDetailById.items[0]?.profileImage ||
      `https://avatars.dicebear.com/api/initials/john%20hanma.svg?background=%230000ff`;

    // Create the post
    await API.graphql({
      query: createPost,
      variables: {
        input: {
          ...post,
          postTags: tags,
          username: username,
          userImage: userImage,
          Category: category,
          email: email,
          reactions: [],
          createdAt: new Date().toISOString(),
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    notifications.showNotification({
      title: "Your Post is published",
      message: "Directing to your published post, please wait",
      loading: false,
      autoClose: false,
      icon: <CheckCircleIcon sx={{ fill: "lightgreen" }} />,
    });
    setDisable(false);
    router.push(`/posts/${id}`);
  };
  const uploadImage = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    if (!fileUploaded) return;
    setImage(fileUploaded);
  };
  const handlePostContent = _.debounce(
    (value) => setPost((t) => ({ ...t, content: value })),
    500
  );
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Typography variant="h3">Create new post</Typography>
      <Alert open={open} setOpen={setOpen} />
      <TextField
        variant="filled"
        onChange={onChange}
        name="title"
        placeholder="Title"
        label="Title"
        value={post.title}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        variant="filled"
        onChange={onChange}
        name="description"
        placeholder="Description"
        label="Description"
        value={post.description}
        fullWidth
        sx={{ mb: 5 }}
      />
      {image && (
        <img src={URL.createObjectURL(image)} className="my-4" alt="image" />
      )}
      <RichTextEditor
        value={post.content}
        sx={{ minHeight: "60vh" }}
        onChange={handlePostContent}
        onImageUpload={handleImageUpload}
        autoFocus
      />
      <input
        type="file"
        ref={hiddenFileInput}
        className="absolute w-0 h-0"
        onChange={handleChange}
      />
      <Box className="flex items-center mb-3">
        <MultiSelect
          data={Tags}
          placeholder="Tags"
          label="Tags"
          onChange={(value) => setTags(value)}
          searchable
          nothingFound="Nothing found"
          sx={{ width: "20em" }}
          className="my-4 mx-3"
        />
        <MultiSelect
          data={Tags}
          placeholder="Select Category ( max 3 )"
          searchable
          label="Category"
          nothingFound="Nothing found"
          sx={{ width: "20em" }}
          className="my-4"
          maxSelectedValues={3}
          onChange={(value) => setCategory(value)}
        />
      </Box>
      <button
        className="bg-purple-600 text-white   px-8 py-2 rounded-lg mr-2"
        onClick={uploadImage}
        disable={disable}
        style={{ width: "20em", marginTop: 3, marginBottom: 5 }}
      >
        Upload Cover Image
        <ImageIcon className="ml-2" />
      </button>
      <button
        disable={disable}
        type="button"
        className="mb-4 bg-blue-600 text-white  px-8 py-2 rounded-lg"
        style={{ width: "20em", marginTop: 3, marginBottom: 5 }}
        onClick={createNewPost}
      >
        Publish Post <PublishIcon className="ml-2" />
      </button>
    </Container>
  );
}

export default CreatePost;
