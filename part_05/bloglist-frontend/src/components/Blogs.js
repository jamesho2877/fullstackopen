import Blog from "./Blog";

const Blogs = ({ blogs, onIncreaseLike }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} onIncreaseLike={onIncreaseLike} />
      ))}
    </div>
  );
};

export default Blogs;
