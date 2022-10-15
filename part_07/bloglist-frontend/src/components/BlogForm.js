import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ onAddBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newURL, setNewURL] = useState("");

  const handleChangeTitle = (e) => {
    const title = e.target.value;
    setNewTitle(title);
  };

  const handleChangeAuthor = (e) => {
    const author = e.target.value;
    setNewAuthor(author);
  };

  const handleChangeURL = (e) => {
    const URL = e.target.value;
    setNewURL(URL);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
    };

    onAddBlog(blogObject);
    setNewTitle("");
    setNewAuthor("");
    setNewURL("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Create a new blog</h2>

      <div>
        Title:{" "}
        <input id="blog-title" value={newTitle} onChange={handleChangeTitle} />
      </div>
      <div>
        Author:{" "}
        <input
          id="blog-author"
          value={newAuthor}
          onChange={handleChangeAuthor}
        />
      </div>
      <div>
        URL: <input id="blog-url" value={newURL} onChange={handleChangeURL} />
      </div>
      <div>
        <button
          id="blog-create-button"
          type="submit"
          onClick={handleFormSubmit}
        >
          Create
        </button>
      </div>
    </form>
  );
};

BlogForm.propTypes = {
  onAddBlog: PropTypes.func.isRequired,
};

export default BlogForm;
