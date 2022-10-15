import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { setNoti, NOTI_ERROR } from "./notificationReducer";

const storageKey = "loggedBlogAppUser";
const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      return action.payload;
    },
    removeUserData() {
      return null;
    },
  },
});

export const { setUserData, removeUserData } = userSlice.actions;

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const userData = await loginService.login(credentials);

      window.localStorage.setItem(storageKey, JSON.stringify(userData));

      blogService.setToken(userData.token);
      dispatch(setUserData(userData));
    } catch (exception) {
      dispatch(setNoti("Wrong username and password", NOTI_ERROR));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem(storageKey);
    dispatch(removeUserData());
  };
};

export const retrieveUserData = () => {
  return async (dispatch) => {
    const storedUserData = window.localStorage.getItem(storageKey);
    if (!storedUserData) return;

    const userData = JSON.parse(storedUserData);
    blogService.setToken(userData.token);
    dispatch(setUserData(userData));
  };
};

export default userSlice.reducer;
