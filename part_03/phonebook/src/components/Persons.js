import Person from "./Person";

const Persons = ({ persons, filterKeyword, onDeletePerson }) => {
  const filteredPersons = filterKeyword.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(filterKeyword.toLowerCase()))
    : persons;

  const nameListDOM = filteredPersons.map(person => (
    <Person key={person.name} person={person} onDeletePerson={onDeletePerson} />
  ));

  return nameListDOM;
};

export default Persons;
