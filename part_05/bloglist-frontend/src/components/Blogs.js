import Blog from "./Blog";

const Blogs = ({ blogs, onIncreaseLike, user, onDeleteBlog }) => {
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

export default Blogs;
