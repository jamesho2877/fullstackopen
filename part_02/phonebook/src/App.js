import { useState } from "react";

const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (e) => {
    const val = e.target.value;
    setNewName(val);
  };

  const handleAddPerson = (e) => {
    e.preventDefault();

    const isNameExisted = persons.filter(person => person.name === newName).length > 0;
    if (isNameExisted) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(prev => prev.concat({ name: newName }));
    setNewName("");
  };

  const nameListDOM = persons.map(person => (
    <div key={person.name}>{person.name}</div>
  ));

  return (
    <div>
      <Header text="Phonebook" />
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleAddPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {nameListDOM}
    </div>
  );
};

export default App;
