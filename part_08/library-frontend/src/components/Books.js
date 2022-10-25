import { useState } from "react";

const Books = ({ books, show }) => {
  const [filteredGenre, setFilteredGenre] = useState(null);

  const genres = books.reduce((acc, book) => acc.concat(book.genres), []);
  const uniqueGenres = genres.filter((genre, idx, arr) => arr.indexOf(genre) === idx);

  const filteredBooks = filteredGenre ? books.filter(b => b.genres.includes(filteredGenre)) : books;

  const handleSelectGenreFilter = (selectedGenre) => {
    if (filteredGenre === selectedGenre) setFilteredGenre(null);
    else setFilteredGenre(selectedGenre);
  };

  if (!show) return null;

  return (
    <div>
      <h2>books</h2>

      {filteredGenre && <p>in genre <b>{filteredGenre}</b></p>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {uniqueGenres.map((uniqGenre) => (
        <button key={uniqGenre} onClick={() => handleSelectGenreFilter(uniqGenre)}>{uniqGenre}</button>
      ))}
    </div>
  );
};

export default Books;
