import { useState } from "react";

const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "040-1234567" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (e) => {
    const name = e.target.value;
    setNewName(name);
  };

  const handleNumberChange = (e) => {
    const number = e.target.value;
    setNewNumber(number);
  };

  const handleAddPerson = (e) => {
    e.preventDefault();

    const isNameExisted = persons.filter(person => person.name === newName).length > 0;
    if (isNameExisted) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(prev => prev.concat({
      name: newName,
      number: newNumber,
    }));
    setNewName("");
    setNewNumber("");
  };

  const nameListDOM = persons.map(person => (
    <div key={person.name}>{person.name} {person.number}</div>
  ));

  return (
    <div>
      <Header text="Phonebook" />
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
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
