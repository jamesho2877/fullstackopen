import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import "./LoginForm.css";
import { useField } from "../hooks";
import { login } from "../reducers/authReducer";

const LoginForm = () => {
  const dispatch = useDispatch();
  const username = useField("text");
  const password = useField("password");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    dispatch(login({ username: username.value, password: password.value }));
    username.reset();
    password.reset();
  };

  return (
    <Form id="login-form" onSubmit={handleFormSubmit}>
      <h2>Login to application</h2>

      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          id="username"
          type={username.type}
          value={username.value}
          onChange={username.onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          id="password"
          type={password.type}
          value={password.value}
          onChange={password.onChange}
        />
      </Form.Group>

      <Button id="login-button" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
