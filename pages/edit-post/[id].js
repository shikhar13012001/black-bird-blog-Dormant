// pages/edit-post/[id].js
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { updatePost } from "../../src/graphql/mutations";
import { getPost } from "../../src/graphql/queries";
import { handleImageUpload } from "../../utils/FileUpload";
import RichTextEditor from "../../components/RichTextEditor";
function EditPost() {
  const [post, setPost] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetchPost();
    async function fetchPost() {
      if (!id) return;
      const postData = await API.graphql({ query: getPost, variables: { id } });
      setPost(postData.data.getPost);
    }
  }, [id]);
  if (!post) return null;
  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }));
  }
  const { title, content } = post;
  async function updateCurrentPost() {
    if (!title || !content) return;
    await API.graphql({
      query: updatePost,
      variables: { input: { title, content, id } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    console.log("post successfully updated!");
    router.push("/my-posts");
  }
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
        Edit post
      </h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={post.title}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      />
      <RichTextEditor
        value={post.content}
        sx={{ minHeight: "60vh" }}
        onChange={(value) => setPost({ ...post, content: value })}
        onImageUpload={handleImageUpload}
      />
      <button
        className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={updateCurrentPost}
      >
        Update Post
      </button>
    </div>
  );
}

export default EditPost;
