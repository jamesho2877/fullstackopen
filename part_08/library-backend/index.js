require("dotenv").config({ path: "./.env.local" });

const { ApolloServer, gql, UserInputError, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

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
    createUser (
      username: String!
      favouriteGenre: String!
    ): User
    login (
      username: String!
      password: String!
    ): Token
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
      const books = await Book.find({}).populate("author").exec();
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
      return Author.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      try {
        const bookParams = { ...args };
        const existingAuthor = await Author.findOne({ name: bookParams.author });
        
        let author;
        if (existingAuthor) {
          author = existingAuthor;
        } else {
          const newAuthor = new Author({ name: bookParams.author });
          author = await newAuthor.save();
        }

        const book = new Book({ ...bookParams, author: author });
        const newBook = await book.save();

        return newBook;
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      
      try {
        const authorName = args.name;
        const existingAuthor = await Author.findOne({ name: authorName });
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
    createUser: async (root, args) => {
      console.log(args.username);
      console.log(args.favouriteGenre);
      try {
        const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre });
        console.log("user", user);
        const newUser = await user.save();
        return newUser;
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
  
      const defaultPassword = "secret";
      if (!user || args.password !== defaultPassword) {
        throw new UserInputError("wrong credentials");
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      };
  
      return {
        value: jwt.sign(userForToken, JWT_SECRET),
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authToken = req ? req.headers.authorization : null;
    if (authToken && authToken.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(authToken.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id).populate("favouriteGenre");
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
