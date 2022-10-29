require("dotenv").config({ path: "./.env.local" });

const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const { createServer } = require("http");

const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

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

const start = async () => {
  const app = express();
  const httpServer = createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Create our WebSocket server using the HTTP server we just set up
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  // Save the returned server's info so we can shutdown this server later
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const authToken = req ? req.headers.authorization : null;
      if (authToken && authToken.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(authToken.substring(7), JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id).populate("favouriteGenre");
        return { currentUser };
      }
    },
    plugins: [
      // Proper shutdown for the HTTP server
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app, path: "/" });

  const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
};

start();
