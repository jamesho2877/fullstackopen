import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNoti, NOTI_SUCCESS } from "./notificationReducer";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return sortBlogsByLikesDesc(action.payload);
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const newBlog = action.payload;
      const newBlogs = state.map((blog) => {
        return blog.id === newBlog.id ? { ...newBlog } : blog;
      });
      return sortBlogsByLikesDesc(newBlogs);
    },
    removeBlog(state, action) {
      const deleteBlogId = action.payload;
      return state.filter((blog) => blog.id !== deleteBlogId);
    },
  },
});

const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const allBlogs = await blogService.getAll();
    dispatch(setBlogs(allBlogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    dispatch(addBlog(newBlog));

    dispatch(
      setNoti(
        `A new blog "${blogObject.title}" by "${blogObject.author}" added`,
        NOTI_SUCCESS
      )
    );
  };
};

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const blog = state.blogs.filter((blog) => blog.id === id)[0];
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    const updatedBlog = await blogService.update(newBlog.id, newBlog);
    dispatch(updateBlog(updatedBlog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.delete(id);
    dispatch(removeBlog(id));
  };
};

function sortBlogsByLikesDesc(arr) {
  return [...arr].sort((a, b) => b.likes - a.likes);
}

export default blogSlice.reducer;
