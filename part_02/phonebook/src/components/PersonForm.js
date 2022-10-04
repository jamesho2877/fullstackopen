const PersonForm = ({
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
  onAddPerson,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={onAddPerson}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
