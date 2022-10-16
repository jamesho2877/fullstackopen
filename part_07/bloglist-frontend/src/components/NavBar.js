import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <NavLink to="/blogs">Blogs</NavLink>
      <NavLink to="/users">Users</NavLink>
    </div>
  );
};

export default NavBar;
