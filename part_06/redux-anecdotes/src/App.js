import { useSelector, useDispatch } from "react-redux";
import { upvote, createNew } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleUpvote = (id) => dispatch(upvote(id));

  const handleCreate = (e) => {
    e.preventDefault();

    const formEl = e.target;
    const content = formEl.content.value || "";
    if (!content) return;

    formEl.content.value = "";
    dispatch(createNew(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleUpvote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form id="anecdote-create-form" onSubmit={handleCreate}>
        <div>
          <input id="anecdote-create-input" name="content" />
        </div>
        <button type="submit" id="anecdote-create-button">
          create
        </button>
      </form>
    </div>
  );
};

export default App;
