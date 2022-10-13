import { useSelector, useDispatch } from "react-redux";
import { upvote } from "../reducers/anecdoteReducer";
import { showMessage } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return [...state.anecdotes].sort((a, b) => b.votes - a.votes);
  });
  const dispatch = useDispatch();

  const handleUpvote = (anecdote) => {
    dispatch(upvote(anecdote.id));
    dispatch(showMessage(`You voted "${anecdote.content}"`));
    window.setTimeout(() => dispatch(showMessage("")), 5000);
  };

  return anecdotes.map((anecdote) => (
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
