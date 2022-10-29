const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const JWT_SECRET = process.env.JWT_SECRET;

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
        const existingAuthor = await Author.findOne({
          name: bookParams.author,
        });

        let author;
        if (existingAuthor) {
          author = existingAuthor;
        } else {
          const newAuthor = new Author({ name: bookParams.author });
          author = await newAuthor.save();
        }

        const book = new Book({ ...bookParams, author: author });
        const newBook = await book.save();

        pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

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
      try {
        const user = new User({
          username: args.username,
          favouriteGenre: args.favouriteGenre,
        });
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
