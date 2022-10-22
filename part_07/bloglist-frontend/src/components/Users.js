import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Users.css";
import Table from "react-bootstrap/Table";
import { getUsers } from "../reducers/userReducer";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const userListDOM = users.map((user, idx) => {
    return (
      <tr key={user.username}>
        <td>{idx + 1}</td>
        <td>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </td>
        <td>{user.blogs.length}</td>
      </tr>
    );
  });

  return (
    <div className="user-table">
      <h4>Users</h4>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>{userListDOM}</tbody>
      </Table>
    </div>
  );
};

export default Users;
