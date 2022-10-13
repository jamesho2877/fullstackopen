import { useDispatch } from "react-redux";
import { createNew } from "../reducers/anecdoteReducer";
import { setNoti } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreate = (e) => {
    e.preventDefault();

    const formEl = e.target;
    const content = formEl.content.value || "";
    if (!content) return;

    formEl.content.value = "";
    dispatch(createNew(content));
    dispatch(setNoti(`You created "${content}"`));
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
  )
};

export default AnecdoteForm;
