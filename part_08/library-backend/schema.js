const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Author {
    name: String!
    born: Int
    id: ID!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    me: User
  }
  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
  }
  type Query {
    bookCount: Int!
    allBooks (author: String, genre: String): [Book!]!
  }

  type Mutation {
    createUser (username: String!, favouriteGenre: String!): User
    login (username: String!, password: String!): Token
  }
  type Mutation {
    addBook (
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
  }
  type Mutation {
    editAuthor (name: String!, setBornTo: Int!): Author
  }
  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = typeDefs;
