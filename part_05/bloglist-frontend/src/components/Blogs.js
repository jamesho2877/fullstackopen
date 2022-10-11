import Blog from "./Blog";

const Blogs = ({ blogs }) => {
  return (
    <p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </p>
  );
};

export default Blogs;
