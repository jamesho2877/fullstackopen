import { createSlice } from "@reduxjs/toolkit";

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
    createNew(state, action) {
      state.push(asObject(action.payload));
    },
    upvote(state, action) {
      return state.map((anecdote) => {
        return anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote;
      });
    },
    setAnecdotes(state, action) {
      return action.payload.map(asObject);
    },
  },
});

export const { createNew, upvote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
