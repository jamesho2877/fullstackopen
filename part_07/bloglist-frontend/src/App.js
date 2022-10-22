import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { getBlogs } from "./reducers/blogReducer";
import { retrieveUserData } from "./reducers/authReducer";
import Routes from "./Routes";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(retrieveUserData());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Notification />

      <div className="main-content">
        {!auth && <LoginForm />}
        <Routes />
      </div>
    </>
  );
};

export default App;
