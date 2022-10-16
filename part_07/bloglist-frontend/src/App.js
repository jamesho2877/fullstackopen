import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import { getBlogs } from "./reducers/blogReducer";
import { retrieveUserData } from "./reducers/authReducer";
import Routes from "./Routes";
import Header from "./components/Header";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(retrieveUserData());
  }, [dispatch]);

  

  const handleToggleForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Notification />

      {auth ? (
        <>
          <Header />
          <h2>Blogs</h2>
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
