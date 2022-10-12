import PropTypes from "prop-types";

const LoginForm = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onLoginSubmit,
}) => {
  return (
    <form onSubmit={onLoginSubmit}>
      <h2>Login to application</h2>
      <div>
        Username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={onUsernameChange}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={onPasswordChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onLoginSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
