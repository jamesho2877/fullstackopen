import { useQuery } from "@apollo/client";
import { USER_INFO } from "../queries";

const RecommendBooks = ({ books, show }) => {
  const userInfo = useQuery(USER_INFO);

  if (userInfo.loading) {
    return <div>loading...</div>;
  }

  const favGenre = userInfo.data.me?.favouriteGenre || null;
  const filteredBooks = favGenre ? books.filter(b => b.genres.includes(favGenre)) : books;

  if (!show) return null;

  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favorite genre <b>{favGenre}</b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecommendBooks;
