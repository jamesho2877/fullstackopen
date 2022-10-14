import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
let timeoutKey;

const notificationSlice = createSlice({
  name: "noti",
  initialState,
  reducers: {
    updateNoti(state, action) {
      return action.payload;
    },
  },
});

export const { updateNoti } = notificationSlice.actions;

export const setNoti = (content, timeout) => {
  return async (dispatch) => {
    dispatch(updateNoti(content));
    window.clearTimeout(timeoutKey);
    timeoutKey = window.setTimeout(() => dispatch(updateNoti("")), timeout*1000);
  };
};

export default notificationSlice.reducer;
