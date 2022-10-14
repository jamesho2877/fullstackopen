import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (e) => {
    const filterVal = e.target.value;
    props.setFilter(filterVal);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter <input value={props.filter} onChange={handleChange} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
