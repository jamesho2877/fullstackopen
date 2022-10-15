import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
let timeoutKey;

const notificationSlice = createSlice({
  name: "noti",
  initialState,
  reducers: {
    updateNoti(state, action) {
      const { message, type } = action.payload;
      return { message, type };
    },
  },
});

const { updateNoti } = notificationSlice.actions;

export const NOTI_INFO = "info";
export const NOTI_SUCCESS = "success";
export const NOTI_ERROR = "error";

export const setNoti = (message, type = NOTI_INFO, timeout = 5000) => {
  return async (dispatch) => {
    dispatch(updateNoti({ message, type }));
    window.clearTimeout(timeoutKey);
    timeoutKey = window.setTimeout(
      () => dispatch(updateNoti({ message: "", type })),
      timeout
    );
  };
};

export default notificationSlice.reducer;
