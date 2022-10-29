import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    genres
    author {
      name
    }
  }
`;

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
