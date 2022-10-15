import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";

export default configureStore({
  reducer: {
    blogs: blogReducer,
    noti: notificationReducer,
    user: userReducer,
  },
});
