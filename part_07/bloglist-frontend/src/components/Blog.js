import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Blog.css";
import Togglable from "./Togglable";

const Blog = ({ blog, isDeletable, onLikeBlog, onDeleteBlog }) => {
  const handleClickLike = () => {
    onLikeBlog(blog.id);
  };

  const handleClickDelete = () => {
    const removeBlog = confirm(
      `Remove blog "${blog.title}" by "${blog.author}"`
    );
    if (!removeBlog) return;
    onDeleteBlog(blog.id);
  };

  return (
    <div className="blog">
      <span className="title">
        <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
      </span>

      {isDeletable && (
        <button className="blog-delete-button" onClick={handleClickDelete}>
          Delete
        </button>
      )}

      <Togglable openText="View" closeText="Hide">
        <div className="blog-content">
          <div>URL: {blog.url}</div>
          <div>
            Likes: {blog.likes}{" "}
            <button className="blog-like-button" onClick={handleClickLike}>
              Like
            </button>
          </div>
        </div>
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  isDeletable: PropTypes.bool.isRequired,
  onLikeBlog: PropTypes.func.isRequired,
  onDeleteBlog: PropTypes.func.isRequired,
};

export default Blog;
