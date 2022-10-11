import "./Blog.css";
import Togglable from "./Togglable";

const Blog = ({ blog }) => (
  <div className="blog">
    <span className="title">{blog.title}</span>
    <Togglable openText="view" closeText="hide">
      <div className="blog-content">
        <div>Author: {blog.author}</div>
        <div>URL: {blog.url}</div>
        <div>Likes: {blog.likes} <button>Like</button></div>
      </div>
    </Togglable>
  </div>
);

export default Blog;
