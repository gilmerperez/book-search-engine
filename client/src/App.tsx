import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// * Create an Apollo Provider to make every request work with the Apollo Server
function App() {
  // State for handling modal visibility
  const [showModal, setShowModal] = useState(false);

  // Function to handle closing the modal
  const handleModalClose = () => {
    setShowModal(false);
  };

  // Function to handle showing the modal
  const handleModalShow = () => {
    setShowModal(true);
  };

  return (
    <>
      <ApolloProvider client={client}>
        <Navbar />
        {/* Render a button to show the modal for signing up */}
        <button onClick={handleModalShow}>Sign Up</button>

        {/* Conditionally render SignupForm when showModal is true */}
        {showModal && <SignupForm handleModalClose={handleModalClose} />}

        <Outlet />
      </ApolloProvider>
    </>
  );
}

export default App;
