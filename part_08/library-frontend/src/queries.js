import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      genres
      author {
        name
      }
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

export const LOGIN = gql`
  mutation login ($username: String!, $password: String!) {
    login (username: $username, password: $password)  {
      value
    }
  }
`;

export const USER_INFO = gql`
  query {
    me {
      username
      favouriteGenre
    }
  }
`;

export const RECOMMENDED_BOOKS = gql`
  query ($genre: String) {
    allBooks (genre: $genre) {
      title
      published
      author {
        name
      }
    }
  }
`;
