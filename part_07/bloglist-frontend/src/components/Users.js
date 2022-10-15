import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../reducers/userReducer";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const userListDOM = users.map((user) => {
    return (
      <tr key={user.username}>
        <td>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </td>
        <td>{user.blogs.length}</td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {userListDOM}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
