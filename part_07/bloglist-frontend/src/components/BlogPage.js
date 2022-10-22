import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Comments from "./Comments";

const BlogPage = () => {
  const { id: blogId } = useParams();

  const blog = useSelector(
    (state) => state.blogs.filter((b) => b.id === blogId)[0]
  );

  return blog ? (
    <div>
      <h4>Blog: {blog.title}</h4>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>Likes</th>
            <th>Added by</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{blog.id}</td>
            <td>{blog.url}</td>
            <td>{blog.likes}</td>
            <td>{blog.author}</td>
          </tr>
        </tbody>
      </Table>

      <Comments blogId={blogId} comments={blog.comments} />
    </div>
  ) : null;
};

export default BlogPage;
