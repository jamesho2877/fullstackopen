require("dotenv").config({ path: "./.env.local" });

const { ApolloServer, gql, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
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
    authorCount: Int!
    allAuthors: [Author!]!
  }
  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
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
    editAuthor (
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      const books = await Book.find({});
      if (!author && !genre) return books;

      if (author && genre) {
        return books.filter((book) => {
          return book.author === author && book.genres.includes(genre);
        });
      } else if (author) {
        return books.filter((book) => book.author === author);
      } else {
        return books.filter((book) => book.genres.includes(genre));
      }
    },
    allAuthors: async () => {
      const [books, authors] = await Promise.all([Book.find({}), Author.find({})]);
      
      const bookCountByAuthor = books.reduce((acc, book) => {
        const author = book.author;
        const count = acc[author] || 0;
        acc[author] = count + 1;
        return acc;
      }, {});

      return authors.map((author) => {
        return {
          ...author,
          bookCount: bookCountByAuthor[author.name] || 0,
        }
      });
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        const book = new Book({ ...args });
        const newBook = await book.save();

        const existingAuthor = await Author.findOne({ name: newBook.author });
        if (!existingAuthor) {
          const newAuthor = new Author({
            name: newBook.author,
            bookCount: 1,
            born: null,
          });
          await newAuthor.save();
        }

        return newBook;
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args) => {
      try {
        const existingAuthor = await Author.findOne({ name: args.name });
        if (!existingAuthor) return null;

        existingAuthor.born = args.setBornTo;
        const updatedAuthor = await existingAuthor.save();

        return updatedAuthor;
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
