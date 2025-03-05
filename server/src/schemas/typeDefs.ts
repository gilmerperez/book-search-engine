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

  input saveBookInput {
    authors: [String]
    description: String
    title: String
    bookId: ID
    image: String
    link: String
  }

  input AddUserInput {
  username: String!
  email: String!
  password: String!
  }

  input BookInput {
  bookText: String!
  bookAuthor: String!
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

    # Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type. (Look into creating what's known as an input type to handle all of these parameters!)
    saveBook(input: BookInput!): User

    # Accepts a book's bookId as a parameter; returns a User type
    deleteBook(bookId: ID!): User
  }
`;

export default typeDefs;