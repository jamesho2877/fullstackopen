import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef(({ openText, closeText, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <>
      <button style={hideWhenVisible} onClick={toggleVisibility}>{openText}</button>
      <button style={showWhenVisible} onClick={toggleVisibility}>{closeText}</button>
      <div style={showWhenVisible}>
        {children}
      </div>
    </>
  );
});

export default Togglable;
