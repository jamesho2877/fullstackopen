import Blog from "./Blog";
import PropTypes from "prop-types";

const Blogs = ({ blogs, user, onIncreaseLike, onDeleteBlog }) => {
  const blogListDOM = blogs.map((blog) => {
    const isDeletable = blog.user.username === user.username;
    return (
      <Blog
        key={blog.id}
        blog={blog}
        onIncreaseLike={onIncreaseLike}
        isDeletable={isDeletable}
        onDeleteBlog={onDeleteBlog}
      />
    );
  });

  return <div style={{ marginTop: "20px" }}>{blogListDOM}</div>;
};

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  onIncreaseLike: PropTypes.func.isRequired,
  onDeleteBlog: PropTypes.func.isRequired,
};

export default Blogs;
