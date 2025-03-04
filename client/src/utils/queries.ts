import { gql } from '@apollo/client';

// GET_ME will execute the 'me' query set up using Apollo Server
export const GET_ME = gql`
  query me {
    me {}
  }
`;