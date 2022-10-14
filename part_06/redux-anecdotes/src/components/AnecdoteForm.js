import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNoti } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const handleCreate = async (e) => {
    e.preventDefault();

    const formEl = e.target;
    const content = formEl.content.value || "";
    if (!content) return;

    props.createAnecdote(content);
    props.setNoti(`You created "${content}"`, 5);
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

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  createAnecdote,
  setNoti,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm);
