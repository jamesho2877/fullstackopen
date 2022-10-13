import { useSelector, useDispatch } from "react-redux";
import { upvote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    [...state].sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const handleUpvote = (id) => dispatch(upvote(id));

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleUpvote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
