import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const handleLikeBlog = (blogId) => {
    dispatch(likeBlog(blogId));
  };

  const handleDeleteBlog = (blogId) => {
    dispatch(deleteBlog(blogId));
  };

  const blogListDOM = blogs.map((blog) => {
    const isDeletable = blog.user.username === user.username;
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

  return <div style={{ marginTop: "20px" }}>{blogListDOM}</div>;
};

export default Blogs;
