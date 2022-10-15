import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUsers } from "../reducers/userReducer";

const User = () => {
  const dispatch = useDispatch();
  const { id: userId } = useParams();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);
  const user = users?.find(u => u.id === userId) || null;

  return user ? (
    <div>
      <h2>User [{user.username}]</h2>
      <p>Name: {user.name}</p>
    </div>
  ) : null;
};

export default User;
