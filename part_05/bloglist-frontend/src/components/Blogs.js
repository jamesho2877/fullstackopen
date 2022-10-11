import Blog from "./Blog";

const Blogs = ({ blogs }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
