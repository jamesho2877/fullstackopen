import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import NavBar from "./NavBar";
import { logout } from "../reducers/authReducer";

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => dispatch(logout());

  return auth ? (
    <div className="header">
      <NavBar />
      <div className="login-status">
        {auth.name} logged in{" "}
        <button id="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  ) : null;
};

export default Header;
