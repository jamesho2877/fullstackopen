import { connect } from "react-redux";

const Notification = ({ noti }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
  };

  return noti ? <div style={style}>{noti}</div> : null;
};

const mapStateToProps = (state) => {
  return {
    noti: state.noti,
  };
};

export default connect(mapStateToProps)(Notification);
