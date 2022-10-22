import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import "./Togglable.css";

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
      <Button
        data-button-text={openText}
        style={hideWhenVisible}
        variant="outline-secondary"
        size="sm"
        onClick={toggleVisibility}
      >
        {openText}
      </Button>
      <Button
        data-button-text={closeText}
        style={showWhenVisible}
        variant="outline-secondary"
        size="sm"
        onClick={toggleVisibility}
      >
        {closeText}
      </Button>
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
