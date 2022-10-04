import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterKeyword, setFilterKeyword] = useState("");

  const handleNameChange = (e) => {
    const name = e.target.value;
    setNewName(name);
  };

  const handleNumberChange = (e) => {
    const number = e.target.value;
    setNewNumber(number);
  };

  const handleFilterChange = (e) => {
    const keyword = e.target.value;
    setFilterKeyword(keyword);
  };

  const handleAddPerson = (e) => {
    e.preventDefault();

    const isNameExisted = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length > 0;
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterKeyword={filterKeyword}
        onFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onAddPerson={handleAddPerson} />

      <h3>Numbers</h3>
      <Persons persons={persons} filterKeyword={filterKeyword} />
    </div>
  );
};

export default App;
