import { useSelector } from "react-redux";

const Notification = () => {
  const noti = useSelector((state) => state.noti);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
  };

  return noti ? <div style={style}>{noti}</div> : null;
};

export default Notification;
