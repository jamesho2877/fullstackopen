const Filter = ({ filterKeyword, onFilterChange }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={filterKeyword} onChange={onFilterChange} />
    </div>
  );
};

export default Filter;
