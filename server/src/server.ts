import path from 'node:path';
import db from './config/connection.js'; // Import the database connection function
import { ApolloServer } from '@apollo/server'; // Import Apollo Server for GraphQL
import { authenticateToken } from './utils/auth.js'; // Import authentication middleware
import express, { Request, Response } from 'express';
import { typeDefs, resolvers } from './schemas/index.js'; // Import GraphQL schema and resolvers
import { expressMiddleware } from '@apollo/server/express4'; // Middleware to connect Apollo Server with Express

// import routes from './routes/index.js';

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

  app.use('/graphql', expressMiddleware(server,
    {
      context: authenticateToken // Attach authentication logic to GraphQL context
      // This way we are able to use this validation logic when making requests and sending responses
    }
  ));

  // This conditionally serves static files when the application is in production mode.
  // In production mode, Express serves the frontend directly from the `client/dist` folder, which contains the npm run build` build
  // This allows the backend to serve both API requests and the frontend from the same server.
  // In development, this is not needed because the frontend runs separately using a development server.
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.cwd(), '../client/dist')));

    // Serve the React app for all unmatched routes
    // If a user navigates to an undefined route `/banana`, Express serves index.html instead of returning a 404 error
    // This allows React Router to handle routing on the frontend, displaying the correct page or a 404 message if no route matches.
    // If React Router doesn't have a matching route, it will display a "Not Found" page (if implemented).
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(process.cwd(), '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  });
};

startApolloServer();
