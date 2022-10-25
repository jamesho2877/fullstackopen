import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../queries";

const LoginForm = ({ show, token, setToken, setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, loginResult] = useMutation(LOGIN, {
    onError: (err) => {
      const error = err.graphQLErrors[0]?.message || err.message;
      console.error(error);
      setError(error);
    },
  });

  useEffect(() => {
    if (loginResult.data) {
      const token = loginResult.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [loginResult.data, setToken]);

  const submit = async (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  if (!show) return null;

  if (token) {
    return <div>You already logged in.</div>;
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
