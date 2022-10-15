import "./Notification.css";
import PropTypes from "prop-types";

export const NOTI_INFO = "info";
export const NOTI_SUCCESS = "success";
export const NOTI_ERROR = "error";

const Notification = ({ message = "", type = NOTI_INFO }) => {
  if (!message) return null;

  return <div className={`message ${type}`}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Notification;
