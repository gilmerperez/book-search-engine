import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';

dotenv.config();

// Function to authenticate the token from the request
export const authenticateToken = ({ req }: any) => {
  // Retrieve the token from request body, query parameters, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // If the token is in the authorization header, extract just the token part
  if (req.headers.authorization) {
    token = token.split(' ').pop()?.trim(); // Added optional chaining for safety
  }

  // If no token is provided, return the request object as is (unauthenticated)
  if (!token) {
    return req;
  }

  try {
    // Verify the token and extract user data if it's valid
    const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' });
    req.user = data; // Attach the user data to the request object for further processing
  } catch (err) {
    console.error('Invalid or expired token', err); // Improved error logging
    throw new AuthenticationError('Invalid or expired token');
  }

  return req; // Return the request object (with or without user data)
};

// Function to generate a new JWT token when a user logs in or signs up
export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id }; // Store essential user info in the payload
  const secretKey: any = process.env.JWT_SECRET_KEY;

  // Throw an error if the secret key is missing
  if (!secretKey) {
    throw new Error('JWT_SECRET_KEY is not defined in environment variables');
  }

  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

// Custom error class for handling authentication-related errors in GraphQL
export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};
