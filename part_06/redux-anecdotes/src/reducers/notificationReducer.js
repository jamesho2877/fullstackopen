import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "noti",
  initialState,
  reducers: {
    setNoti(state, action) {
      return action.payload;
    },
  },
});

export const { setNoti } = notificationSlice.actions;
export default notificationSlice.reducer;
