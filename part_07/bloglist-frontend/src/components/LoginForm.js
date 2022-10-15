import { useDispatch } from "react-redux";
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
    <form id="login" onSubmit={handleFormSubmit}>
      <h2>Login to application</h2>
      <div>
        Username
        <input
          id="username"
          type={username.type}
          value={username.value}
          onChange={username.onChange}
        />
      </div>
      <div>
        Password
        <input
          id="password"
          type={password.type}
          value={password.value}
          onChange={password.onChange}
        />
      </div>
      <button id="login-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
