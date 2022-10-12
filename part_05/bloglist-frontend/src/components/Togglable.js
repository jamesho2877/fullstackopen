import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

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
      <button
        data-button-text={openText}
        style={hideWhenVisible}
        onClick={toggleVisibility}
      >
        {openText}
      </button>
      <button
        data-button-text={closeText}
        style={showWhenVisible}
        onClick={toggleVisibility}
      >
        {closeText}
      </button>
      <div className="break"></div>
      <div className="togglable-content" style={showWhenVisible}>
        {children}
      </div>
    </>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  openText: PropTypes.string.isRequired,
  closeText: PropTypes.string.isRequired,
};

export default Togglable;
