import { useSelector, useDispatch } from "react-redux";
import { upvote } from "../reducers/anecdoteReducer";
import { setNoti } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return [...state.anecdotes].sort((a, b) => b.votes - a.votes);
  });
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleUpvote = (anecdote) => {
    dispatch(upvote(anecdote.id));
    dispatch(setNoti(`You voted "${anecdote.content}"`));
  };

  const filteredAnecdotes =
    filter.length > 0
      ? anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
      : anecdotes;

  return filteredAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleUpvote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
