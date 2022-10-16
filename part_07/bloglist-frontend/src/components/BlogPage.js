import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlogs } from "../reducers/blogReducer";

const BlogPage = () => {
  const dispatch = useDispatch();
  const { id: blogId } = useParams();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);
  const blog = blogs?.find(b => b.id === blogId) || null;

  return blog ? (
    <div>
      <h2>{blog.title}</h2>
      <p>ID: {blog.id}</p>
      <p>URL: <a href={blog.url}>{blog.url}</a></p>
      <p>Likes: {blog.likes}</p>
      <p>Added by {blog.author}</p>
    </div>
  ) : null;
};

export default BlogPage;
