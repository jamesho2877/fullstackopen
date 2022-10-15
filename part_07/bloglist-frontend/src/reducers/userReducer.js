import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const initialState = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

const { setUsers } = userSlice.actions;

export const getUsers = () => {
  return async (dispatch) => {
    const allUsers = await userService.getAll();
    dispatch(setUsers(allUsers));
  };
};

export default userSlice.reducer;
