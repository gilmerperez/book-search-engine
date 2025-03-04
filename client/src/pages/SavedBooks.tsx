// import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";
import type { User } from "../models/User";

// Import useQuery and useMutation hooks to ensure that we can use the GET_ME and REMOVE_BOOK mutations in our component
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

const SavedBooks = () => {
  // Fetch user data with GET_ME query
  const { loading, data } = useQuery(GET_ME);
  const userData: User | null = data?.me || null; // Ensure userData is structured correctly

  // Define the REMOVE_BOOK mutation
  const [removeBookMutation] = useMutation(REMOVE_BOOK, {
    update(cache, { data }) {
      // Update the cache to remove the book from saved books after deletion
      const existingData: any = cache.readQuery({ query: GET_ME });

      if (existingData && data?.removeBook) {
        cache.writeQuery({
          query: GET_ME,
          data: {
            me: {
              ...existingData.me,
              savedBooks: existingData.me.savedBooks.filter(
                (book: { bookId: string }) =>
                  book.bookId !== data.removeBook.bookId
              ),
            },
          },
        });
      }
    },
  });

  // Function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId: string) => {
    if (!Auth.loggedIn()) {
      return;
    }

    try {
      await removeBookMutation({
        variables: { bookId },
      });

      // Remove the book's ID from localStorage after successful deletion
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          {userData?.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData?.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData?.savedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card border="dark">
                {book.image && (
                  <Card.Img
                    src={book.image}
                    alt={`Cover for ${book.title}`}
                    variant="top"
                  />
                )}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
