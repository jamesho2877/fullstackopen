const BlogForm = ({
  newTitle,
  newAuthor,
  newURL,
  onTitleChange,
  onAuthorChange,
  onURLChange,
  onAddBlog,
  style,
}) => {
  return (
    <form style={style}>
      <h2>Create new</h2>

      <div>
        Title: <input value={newTitle} onChange={onTitleChange} />
      </div>
      <div>
        Author: <input value={newAuthor} onChange={onAuthorChange} />
      </div>
      <div>
        URL: <input value={newURL} onChange={onURLChange} />
      </div>
      <div>
        <button type="submit" onClick={onAddBlog}>
          Create
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
