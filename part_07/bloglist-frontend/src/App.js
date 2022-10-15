import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import { initializeBlogs } from "./reducers/blogReducer";
import { logout, retrieveUserData } from "./reducers/authReducer";
import Routes from "./Routes";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(retrieveUserData());
  }, [dispatch]);

  const handleLogout = () => dispatch(logout());

  const handleToggleForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Notification />

      {auth ? (
        <>
          <h2>Blogs</h2>
          <p>
            {auth.name} logged in{" "}
            <button id="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </p>

          <Togglable openText="New blog" closeText="Cancel" ref={blogFormRef}>
            <BlogForm onToggleForm={handleToggleForm} />
          </Togglable>
        </>
      ) : (
        <LoginForm />
      )}
  
      <Routes />
    </div>
  );
};

export default App;
