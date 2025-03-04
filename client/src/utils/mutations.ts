import { gql } from '@apollo/client';

// LOGIN_USER will execute the loginUser mutation set up using Apollo Server
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        token
        user {
          _id
          username
        }
      }
  }
`;

// ADD_USER will execute the addUser mutation
export const ADD_USER = gql`
  mutation addUser($input: AddUserArgs!) {
    addUser(input: $input) {
      user {
      username
      _id
    }
    token
  }
  }
`;

// SAVE_BOOK will execute the saveBook mutation
export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

// REMOVE_BOOK will execute the removeBook mutation
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;