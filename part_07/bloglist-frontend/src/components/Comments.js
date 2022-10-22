import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import "./Comments.css";
import { useField } from "../hooks";
import { addComment } from "../reducers/blogReducer";

const Comments = ({ blogId, comments }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const comment = useField("text");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newComment = comment.value;
    if (!newComment) return;

    dispatch(addComment(blogId, newComment));
    comment.reset();
  };

  return (
    <div className="comments">
      <h4>Comments</h4>
      {auth ? (
        <form id="comment-form" onSubmit={handleFormSubmit}>
          <input
            type={comment.type}
            value={comment.value}
            onChange={comment.onChange}
          />
          <Button type="submit">add comment</Button>
        </form>
      ) : null}
      {comments.length ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default Comments;
