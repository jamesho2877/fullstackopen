const Person = ({ person, onDeletePerson }) => {
  return (
    <div>
      <span>{person.name}</span>
      <span>{person.number}</span>
      <button onClick={() => onDeletePerson(person)}>delete</button>
    </div>
  );
};

export default Person;
