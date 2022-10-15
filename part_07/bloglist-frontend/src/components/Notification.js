import { useSelector } from "react-redux";
import "./Notification.css";

const Notification = () => {
  const noti = useSelector((state) => state.noti);

  return noti.message ? (
    <div className={`message ${noti.type}`}>{noti.message}</div>
  ) : null;
};

export default Notification;
