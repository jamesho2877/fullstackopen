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

export default LoginForm;
