import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Navbar } from "react-bootstrap";
import NavItems from "./NavItems";
import { logout } from "../reducers/authReducer";

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => dispatch(logout());

  return auth ? (
    <Navbar className="header" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>Blog app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavItems />
        </Navbar.Collapse>

        <div className="login-status">
          {auth.name} logged in{" "}
          <Button
            id="logout-button"
            variant="outline-secondary"
            size="sm"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  ) : null;
};

export default Header;
