import { useState } from "react";

const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

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

  const filteredPersons = filterKeyword.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(filterKeyword.toLowerCase()))
    : persons;
  const nameListDOM = filteredPersons.map(person => (
    <div key={person.name}>{person.name} {person.number}</div>
  ));

  return (
    <div>
      <Header text="Phonebook" />
      <div>
        filter shown with: <input value={filterKeyword} onChange={handleFilterChange}/>
      </div>

      <Header text="add a new" />
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

      <Header text="Numbers" />
      {nameListDOM}
    </div>
  );
};

export default App;
