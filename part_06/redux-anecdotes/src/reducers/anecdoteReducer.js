import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = ({ id = getId(), content = "", votes = 0 }) => ({
  id,
  content,
  votes,
});

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    updateAnecdote(state, action) {
      const newAnecdote = action.payload;
      return state.map((anecdote) => {
        return anecdote.id === newAnecdote.id ? { ...newAnecdote } : anecdote;
      });
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { updateAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const upvoteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const anecdote = state.anecdotes.filter((anecdote) => anecdote.id === id)[0];
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    const updatedAnecdote = await anecdoteService.update(newAnecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
