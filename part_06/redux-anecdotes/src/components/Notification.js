import { connect } from "react-redux";

const Notification = (props) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
  };

  return props.noti ? <div style={style}>{props.noti}</div> : null;
};

const mapStateToProps = (state) => {
  return {
    noti: state.noti,
  };
};

export default connect(mapStateToProps)(Notification);
