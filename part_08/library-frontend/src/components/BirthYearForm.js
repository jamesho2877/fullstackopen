import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UPDATE_BIRTHYEAR, ALL_AUTHORS } from "../queries";

const BirthYearForm = ({ authors }) => {
  const [author, setAuthor] = useState("");
  const [birthyear, setBirthyear] = useState("");

  const [updateBirthyear, updateBirthyearResult] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (e) => {
    e.preventDefault();

    updateBirthyear({
      variables: {
        author: author,
        birthyear: Number(birthyear),
      },
    });

    setAuthor("");
    setBirthyear("");
  };

  return (
    <form onSubmit={submit}>
      <h4>Set birthyear</h4> 
      <div>
        name
        <select value={author} onChange={({ target }) => setAuthor(target.value)}>
          {authors.map((author) => (
            <option key={author.name} value={author.name}>{author.name}</option>
          ))}
        </select>
      </div>
      <div>
        born
        <input
          type="number"
          value={birthyear}
          onChange={({ target }) => setBirthyear(target.value)}
        />
      </div>
      <button type="submit">update author</button>
    </form>
  );
};

export default BirthYearForm;
