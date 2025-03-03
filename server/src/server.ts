import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';
import db from './config/connection.js' // Import the database connection function
import { ApolloServer } from '@apollo/server'; // Import Apollo Server for GraphQL
import { expressMiddleware } from '@apollo/server/express4'; // Middleware to connect Apollo Server with Express
import { typeDefs, resolvers } from './schemas/index.js'; // Import GraphQL schema and resolvers
import { authenticateToken } from './utils/auth.js'; // Import authentication middleware

// Create an instance of Apollo Server with type definitions and resolvers
const server = new ApolloServer({
  typeDefs, // Without typeDefs, Apollo Server wouldn't know what kind of data can be requested or modified
  resolvers // Without resolvers, Apollo Server wouldn't know how to process requests or return responses
});

const startApolloServer = async () => {
  await server.start();
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Set up GraphQL API endpoint with authentication context
  app.use('/graphql', expressMiddleware(server,
    {
      context: authenticateToken // Attach authentication logic to GraphQL context
      // This way we are able to use this validation logic when making requests and sending responses
    }
  ));

  // This conditionally serves static files when the application is in production mode.
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.cwd(), '../client/dist')));

    // Serve the React app for all unmatched routes
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(process.cwd(), '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`🌍 API server now running on localhost:${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
