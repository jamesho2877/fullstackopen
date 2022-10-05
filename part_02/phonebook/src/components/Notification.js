import "./Notification.css";

const Notification = ({ message = "" }) => {
  if (!message) return null;

  return <div className="message info">{message}</div>;
};

export default Notification;
