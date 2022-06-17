import RichTextEditor from "./RichTextEditor";
import { handleImageUpload } from "../utils/FileUpload";

const CommentInput = ({ comment, setComment }) => {
  return (
    <RichTextEditor
      value={comment}
      sx={{ minHeight: "30vh" }}
      onChange={(value) => setComment(value)}
      onImageUpload={handleImageUpload}
    />
  );
};

export default CommentInput;
