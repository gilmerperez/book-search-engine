import { ObjectId } from 'mongoose';
// import Book from '../models/Book.js';
import User from '../models/User.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

// * Define types for mutation and query arguments
// Defines the expected argument for fetching a single user
interface UserArgs {
  username: string;
}

// This interface defines the expected arguments when adding a user
interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

// This interface defines the arguments required for the login mutation
interface LoginUserArgs {
  email: string;
  password: string;
}

// This defines the input structure for the saveBook mutation
interface SaveBookArgs {
  input: {
    bookText: string;
    bookAuthor: string;
  };
}

// Used for fetching or modifying a single book
interface BookArgs {
  bookId: string;
}

// Context type for authentication, includes user details if authenticated
interface UserContext {
  user: {
    username: string;
    email: string;
    _id: ObjectId;
  };
}

// * Define resolver functions for queries and mutations
const resolvers = {
  Query: {
    getSingleUser: async (_parent: unknown, { username }: UserArgs) => {
      return User.findOne({ username });
    }
  },

  Mutation: {
    // Register a new user and return an authentication token
    createUser: async (_parent: unknown, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });
      // Generate a JWT token for authentication
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    // Authenticate a user and return a token if credentials are valid
    login: async (_parent: unknown, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    // Save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    saveBook: async (_parent: unknown, { input }: SaveBookArgs, context: UserContext) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const book = { ...input };

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: book } },
        { new: true, runValidators: true }
      );

      return updatedUser;
    },

    // Remove a book from `savedBooks`
    deleteBook: async (_parent: unknown, { bookId }: BookArgs, context: UserContext) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: bookId } },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("Couldn't find user with this id!");
      }

      return updatedUser;
    }
  }
}

export default resolvers;