import React from "react";
import ReactDOM from "react-dom/client";
import { legacy_createStore as createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const handleAction = (type) => store.dispatch({ type });
  const { good, ok, bad } = store.getState();

  return (
    <div>
      <button onClick={() => handleAction("GOOD")}>good</button>
      <button onClick={() => handleAction("OK")}>ok</button>
      <button onClick={() => handleAction("BAD")}>bad</button>
      <button onClick={() => handleAction("ZERO")}>reset stats</button>
      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
