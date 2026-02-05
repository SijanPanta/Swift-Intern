const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Define the GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Create Express app
const app = express();

// Start the server
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();