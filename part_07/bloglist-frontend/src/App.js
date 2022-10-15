import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import { initializeBlogs } from "./reducers/blogReducer";
import { logout, retrieveUserData } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  console.log("user", user);

  useEffect(() => {
    console.log("init blogs");
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    console.log("init user");
    dispatch(retrieveUserData());
  }, [dispatch]);

  const handleLogout = () => dispatch(logout());

  const handleToggleForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Notification />

      {user ? (
        <>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in{" "}
            <button id="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </p>

          <Togglable openText="New blog" closeText="Cancel" ref={blogFormRef}>
            <BlogForm onToggleForm={handleToggleForm} />
          </Togglable>

          <Blogs />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default App;
