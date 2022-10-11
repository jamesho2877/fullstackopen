import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification, {
  NOTI_SUCCESS,
  NOTI_ERROR,
} from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [noti, setNoti] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newURL, setNewURL] = useState("");

  useEffect(() => {
    const getAllBlogs = async () => {
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
    };

    getAllBlogs();
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON);
      setUser(userData);
      blogService.setToken(userData.token);
    }
  }, []);

  const handleSetMessage = (messageText, messageType = NOTI_ERROR) => {
    setNoti({
      message: messageText,
      type: messageType,
    });
    window.setTimeout(() => setNoti({}), 5000);
  };

  const onUsernameChange = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onPasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(userData)
      );

      blogService.setToken(userData.token);
      setUser(userData);
      setUsername("");
      setPassword("");
    } catch (exception) {
      handleSetMessage("Wrong credentials");
      setTimeout(() => {
        handleSetMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const onTitleChange = (e) => {
    const title = e.target.value;
    setNewTitle(title);
  };

  const onAuthorChange = (e) => {
    const author = e.target.value;
    setNewAuthor(author);
  };

  const onURLChange = (e) => {
    const URL = e.target.value;
    setNewURL(URL);
  };

  const handleAddBlog = (e) => {
    e.preventDefault();

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
    };

    blogService.create(blogObject).then((createdBlog) => {
      handleSetMessage(`Added blog "${newTitle}`, NOTI_SUCCESS);
      setBlogs((prev) => prev.concat(createdBlog));
      setNewTitle("");
      setNewAuthor("");
      setNewURL("");
    });
  };

  const blogForm = () => (
    <>
      <h2>blogs</h2>

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <BlogForm
        newTitle={newTitle}
        newAuthor={newAuthor}
        newURL={newURL}
        onTitleChange={onTitleChange}
        onAuthorChange={onAuthorChange}
        onURLChange={onURLChange}
        onAddBlog={handleAddBlog}
      />

      <Blogs blogs={blogs} />
    </>
  );

  return (
    <div>
      <Notification message={noti.message} type={noti.type} />

      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          onUsernameChange={onUsernameChange}
          onPasswordChange={onPasswordChange}
          onLoginSubmit={onLoginSubmit}
        />
      ) : (
        blogForm()
      )}
    </div>
  );
};

export default App;
