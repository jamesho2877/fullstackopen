import "./Blog.css";
import Togglable from "./Togglable";

const Blog = ({ blog, onIncreaseLike, isDeletable, onDeleteBlog }) => {
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
      <span className="title">{blog.title}</span>
      { isDeletable && <button className="delete-button" onClick={handleClickDelete}>Delete</button> }
      <Togglable openText="view" closeText="hide">
        <div className="blog-content">
          <div>Author: {blog.author}</div>
          <div>URL: {blog.url}</div>
          <div>Likes: {blog.likes} <button onClick={handleClickLike}>Like</button></div>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
