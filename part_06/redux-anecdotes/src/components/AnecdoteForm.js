import { useDispatch } from "react-redux";
import { createNew } from "../reducers/anecdoteReducer";
import { setNoti } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreate = async (e) => {
    e.preventDefault();

    const formEl = e.target;
    const content = formEl.content.value || "";
    if (!content) return;

    const newAnecdote = await anecdoteService.createNew({
      content: content,
      votes: 0,
    });
    dispatch(createNew(newAnecdote));
    dispatch(setNoti(`You created "${newAnecdote.content}"`));
    formEl.content.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form id="anecdote-create-form" onSubmit={handleCreate}>
        <div>
          <input id="anecdote-create-input" name="content" />
        </div>
        <button type="submit" id="anecdote-create-button">
          create
        </button>
      </form>
    </>
  );
};

export default AnecdoteForm;
