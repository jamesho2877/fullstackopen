import { useDispatch } from "react-redux";
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
    <form onSubmit={handleFormSubmit}>
      <h2>Create a new blog</h2>

      <div>
        Title:{" "}
        <input
          id="blog-title"
          type={title.type}
          value={title.value}
          onChange={title.onChange}
        />
      </div>
      <div>
        Author:{" "}
        <input
          id="blog-author"
          type={author.type}
          value={author.value}
          onChange={author.onChange}
        />
      </div>
      <div>
        URL:{" "}
        <input
          id="blog-url"
          type={url.type}
          value={url.value}
          onChange={url.onChange}
        />
      </div>
      <div>
        <button id="blog-create-button" type="submit">
          Create
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
