import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification, { NOTI_SUCCESS, NOTI_ERROR } from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterKeyword, setFilterKeyword] = useState("");
  const [noti, setNoti] = useState({});

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

  const handleSetMessage = (messageText, messageType) => {
    setNoti({
      message: messageText,
      type: messageType,
    });
    window.setTimeout(() => setNoti({}), 5000);
  };

  const handleDeletePerson = (person) => {
    const personName = person.name;
    const confirmed = window.confirm(`Delete ${personName} ?`);
    if (!confirmed) return;

    personService
      .delete(person.id)
      .then(deletedSuceeded => {
        if (deletedSuceeded) {
          setPersons(prev => prev.filter(p => p.id !== person.id));
        } else {
          alert(`Unable to delete ${personName}`);
        }
      })
      .catch(err => {
        if (err.response.status === 404) {
          alert(`${personName} was already deleted`);
          setPersons(prev => prev.filter(p => p.id !== person.id));
        } else {
          alert(`Unable to delete ${personName}`);
        }
      });
  };

  const handleExistedPerson = (existedPerson) => {
    const confirmed = window.confirm(`${existedPerson.name} is already added to phonebook, replace the old number with a new one?`);
    if (!confirmed) return;

    personService
      .update(
        existedPerson.id,
        { ...existedPerson, number: newNumber }
      )
      .then(updatedPerson => {
        setPersons(prev => prev.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
        setNewName("");
        setNewNumber("");
      })
      .catch(err => {
        if (err.response.status === 404) {
          handleSetMessage(`Information of ${existedPerson.name} has already been removed from server`, NOTI_ERROR);
          setPersons(prev => prev.filter(p => p.id !== existedPerson.id));
        } else {
          alert(`Unable to update ${existedPerson.name}`);
        }
      });
  }

  const handleAddPerson = (e) => {
    e.preventDefault();

    const existedPerson = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())[0];
    if (existedPerson) {
      handleExistedPerson(existedPerson);
      return;
    }

    personService.create({
      name: newName,
      number: newNumber,
    }).then(newlyAddedPerson => {
      handleSetMessage(`Added ${newName}`, NOTI_SUCCESS);
      setPersons(prev => prev.concat(newlyAddedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={noti.message} type={noti.type} />
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
      <Persons
        persons={persons}
        filterKeyword={filterKeyword}
        onDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
