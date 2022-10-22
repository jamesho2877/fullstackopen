import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import { HandThumbsUp } from "react-bootstrap-icons";
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
    <ListGroup.Item className="blog-item">
      <span className="title">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} - {blog.author}
        </Link>
      </span>

      {isDeletable && (
        <Button
          className="blog-delete-button"
          variant="outline-secondary"
          size="sm"
          onClick={handleClickDelete}
        >
          Delete
        </Button>
      )}

      <Togglable openText="View" closeText="Hide">
        <div className="blog-content">
          <div>URL: {blog.url}</div>
          <div>
            Likes: {blog.likes}
            <Button
              className="blog-like-button"
              variant="outline-secondary"
              size="sm"
              onClick={handleClickLike}
            >
              <HandThumbsUp />
            </Button>
          </div>
        </div>
      </Togglable>
    </ListGroup.Item>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  isDeletable: PropTypes.bool.isRequired,
  onLikeBlog: PropTypes.func.isRequired,
  onDeleteBlog: PropTypes.func.isRequired,
};

export default Blog;
