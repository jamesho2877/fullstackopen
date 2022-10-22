import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import "./BlogForm.css";
import { useField } from "../hooks";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = (props) => {
  const dispatch = useDispatch();
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    dispatch(createBlog(blogObject));
    title.reset();
    author.reset();
    url.reset();

    props.onToggleForm();
  };

  return (
    <Form id="blog-form" onSubmit={handleFormSubmit}>
      <h5>Create a new blog</h5>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          id="blog-title"
          type={title.type}
          value={title.value}
          onChange={title.onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control
          id="blog-author"
          type={author.type}
          value={author.value}
          onChange={author.onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>URL</Form.Label>
        <Form.Control
          id="blog-url"
          type={url.type}
          value={url.value}
          onChange={url.onChange}
        />
      </Form.Group>

      <Button id="blog-create-button" variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default BlogForm;
