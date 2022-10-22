import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
// import "./NavItems.css";

const NavItems = () => {
  return (
    <Nav className="nav-bar me-auto">
      <Nav.Item>
        <NavLink className="nav-link" to="/blogs">
          Blogs
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link" to="/users">
          Users
        </NavLink>
      </Nav.Item>
    </Nav>
  );
};

export default NavItems;
