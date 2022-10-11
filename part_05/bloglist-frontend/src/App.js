import { useState, useEffect } from "react";
import Blog from "./components/Blog";
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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userData = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(userData));

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <>
      <h2>blogs</h2>

      <p>{user.name} logged in</p>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );

  return (
    <div>
      <Notification message={noti.message} type={noti.type} />

      {user === null ? loginForm() : blogForm()}
    </div>
  );
};

export default App;
