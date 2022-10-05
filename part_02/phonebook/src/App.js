import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterKeyword, setFilterKeyword] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons));
  }, []);

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

    personService.create({
      name: newName,
      number: newNumber,
    }).then(newlyAddedPerson => {
      setPersons(prev => prev.concat(newlyAddedPerson));
      setNewName("");
      setNewNumber("");
    });
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
