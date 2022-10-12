import "./Blog.css";
import PropTypes from "prop-types";
import Togglable from "./Togglable";

const Blog = ({ blog, isDeletable, onIncreaseLike, onDeleteBlog }) => {
  const handleClickLike = () => {
    onIncreaseLike({ ...blog, likes: blog.likes + 1 });
  };

  const handleClickDelete = () => {
    const removeBlog = confirm(`Remove blog "${blog.title}" by "${blog.author}"`);
    if (!removeBlog) return;
    onDeleteBlog(blog);
  };

  return (
    <div className="blog">
      <span className="title">{blog.title} - {blog.author}</span>
      { isDeletable && <button className="blog-delete-button" onClick={handleClickDelete}>Delete</button> }
      <Togglable openText="View" closeText="Hide">
        <div className="blog-content">
          <div>URL: {blog.url}</div>
          <div>Likes: {blog.likes} <button onClick={handleClickLike}>Like</button></div>
        </div>
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  isDeletable: PropTypes.bool.isRequired,
  onIncreaseLike: PropTypes.func.isRequired,
  onDeleteBlog: PropTypes.func.isRequired,
};

export default Blog;
