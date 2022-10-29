import { useState } from "react";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import "./App.css";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import RecommendBooks from "./components/RecommendBooks";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      notify(`${addedBook.title} added`);

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        };
      });
    },
  });

  if (authors.loading) {
    return <div>loading...</div>;
  }

  if (books.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    window.setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        {token && <button onClick={() => setPage("recommend-books")}>recommend</button>}
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors authors={authors.data.allAuthors} show={page === "authors"} />

      <Books books={books.data.allBooks} show={page === "books"} />

      <NewBook show={page === "add"} setError={notify} />

      <LoginForm show={page === "login"} token={token} setToken={setToken} setError={notify} />

      <RecommendBooks books={books.data.allBooks} show={page === "recommend-books"} />
    </div>
  );
};

export default App;
