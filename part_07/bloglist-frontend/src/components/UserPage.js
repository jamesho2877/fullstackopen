import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUsers } from "../reducers/userReducer";

const UserPage = () => {
  const dispatch = useDispatch();
  const { id: userId } = useParams();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);
  const user = users?.find((u) => u.id === userId) || null;

  return user ? (
    <div>
      <h4>User: {user.name}</h4>
      <p>The number of blogs: {user.blogs?.length || 0}</p>
    </div>
  ) : null;
};

export default UserPage;
