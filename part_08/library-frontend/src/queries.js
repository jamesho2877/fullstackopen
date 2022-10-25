import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook (
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook (
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      author
      genres
    }
  }
`;

export const UPDATE_BIRTHYEAR = gql`
  mutation editAuthor (
    $author: String!
    $birthyear: Int!
  ) {
    editAuthor (
      name: $author
      setBornTo: $birthyear
    ) {
      name
      born
    }
  }
`;