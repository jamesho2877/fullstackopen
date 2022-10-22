import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import "./Blogs.css";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const auth = useSelector((state) => state.auth);
  const blogFormRef = useRef();
  if (!auth) return null;

  const handleLikeBlog = (blogId) => {
    dispatch(likeBlog(blogId));
  };

  const handleDeleteBlog = (blogId) => {
    dispatch(deleteBlog(blogId));
  };

  const handleToggleForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  const blogListDOM = blogs.map((blog) => {
    const isDeletable = blog.user?.username === auth?.username || false;
    return (
      <Blog
        key={blog.id}
        blog={blog}
        isDeletable={isDeletable}
        onLikeBlog={handleLikeBlog}
        onDeleteBlog={handleDeleteBlog}
      />
    );
  });

  return (
    <div className="blogs-page">
      <h4>Blogs</h4>
      <Togglable openText="New blog" closeText="Cancel" ref={blogFormRef}>
        <BlogForm onToggleForm={handleToggleForm} />
      </Togglable>

      <ListGroup className="blog-list" variant="flush">
        {blogListDOM}
      </ListGroup>
    </div>
  );
};

export default Blogs;
