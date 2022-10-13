import { createSlice } from "@reduxjs/toolkit";

const initMessage = "This is a test notification message";

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
