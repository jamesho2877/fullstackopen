import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNoti } from "../reducers/notificationReducer";

const Notification = () => {
  // noti get re-created to help reseting timer every time
  // do not use: const noti = useSelector((state) => state.noti);
  const { noti } = useSelector((state) => state);
  const dispatch = useDispatch();
  const timerRef = useRef(null);

  useEffect(() => {
    if (noti) {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => dispatch(setNoti("")), 5000);
    }
    
    return () => window.clearTimeout(timerRef.current);
  });

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
  };

  return noti ? <div style={style}>{noti}</div> : null;
};

export default Notification;
