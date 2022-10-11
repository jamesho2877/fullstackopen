const BlogForm = ({
  newTitle,
  newAuthor,
  newURL,
  onTitleChange,
  onAuthorChange,
  onURLChange,
  onAddBlog,
}) => {
  return (
    <form>
      <h2>create new</h2>

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
          create
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
