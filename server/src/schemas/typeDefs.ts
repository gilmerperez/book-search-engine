import gql from 'graphql-tag';

// Define the GraphQL schema
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int!
    savedBooks: [Book] # This will be an array of the Book type
  }

  type Book {
    bookId: ID! # Not the _id, but the book's id value returned from Google's Book API
    authors: [String] # An array of strings, as there may be more than one author
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID! # JWT token returned upon login or signup
    user: User # The authenticated user details, references the User type
  }

  # Input type to handle user data for creating a user
  input AddUserInput {
    username: String!
    email: String!
    password: String!
  }

  # Input type for book information to be saved
  input BookInput {
    bookId: ID!
    authors: [String]!
    description: String
    title: String
    image: String
    link: String
  }

  # Queries allow users to retrieve data from the server
  type Query {
    me: User # Get the currently authenticated user's details
    getSingleUser(username: String!): User
  }

  # Mutations allow users to modify data on the server
  type Mutation {
    # Accepts an email and password as parameters; returns an Auth type
    login(email: String!, password: String!): Auth

    # Accepts a username, email, and password as parameters; returns an Auth type
    createUser(input: AddUserInput!): Auth

    # Accepts a book's information as parameters and returns the updated User
    saveBook(input: BookInput!): User

    # Accepts a book's bookId as a parameter and removes it from the user's savedBooks
    deleteBook(bookId: ID!): User
  }
`;

export default typeDefs;
