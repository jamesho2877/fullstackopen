import { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
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
  const blogFormRef = useRef();

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
      handleSetMessage("Wrong username and password");
      setTimeout(() => {
        handleSetMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (e) => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const handleAddBlog = async (blogObject) => {
    const createdBlog = await blogService.create(blogObject);
    handleSetMessage(`A new blog "${createdBlog.title}" by "${createdBlog.author}" added`, NOTI_SUCCESS);
    setBlogs((prev) => prev.concat(createdBlog));
    blogFormRef.current.toggleVisibility();
  };

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
        <>
          <h2>Blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm onAddBlog={handleAddBlog} />
          </Togglable>
          <Blogs blogs={blogs} />
        </>
      )}
    </div>
  );
};

export default App;
