import { createSlice } from "@reduxjs/toolkit";

const initMessage = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState: initMessage,
  reducers: {
    showMessage(state, action) {
      return action.payload;
    },
  },
});

export const { showMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
