import { useState } from "react";

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
        Title: <input value={newTitle} onChange={handleChangeTitle} />
      </div>
      <div>
        Author: <input value={newAuthor} onChange={handleChangeAuthor} />
      </div>
      <div>
        URL: <input value={newURL} onChange={handleChangeURL} />
      </div>
      <div>
        <button type="submit" onClick={handleFormSubmit}>
          Create
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
