import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const filterVal = e.target.value;
    dispatch(setFilter(filterVal));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter <input value={filter} onChange={handleChange} />
    </div>
  );
};

export default Filter;
