# Book Search Engine

## Project Overview

The Book Search Engine is a full-stack web application designed to help avid readers discover and save books they would like to read. The application utilizes the MERN stack (MongoDB, Express, React, Node.js) and integrates the Google Books API to fetch book data. In this project, you will refactor a RESTful API to a GraphQL API using Apollo Server, providing a more efficient way to handle book searches and saving user data.

The app allows users to search for books by title and author, view detailed information about each book, and save the books they want to read to their personal account. Users can log in, sign up, and view their saved books. The app is built with React on the front end, Express and Apollo Server for the GraphQL API, and MongoDB as the database to store user data and saved books.

This project provides an excellent demonstration of how modern web applications handle user authentication, data fetching, and manipulation, as well as the transition from RESTful APIs to GraphQL.

## Table of Contents

- [Usage](#usage)
- [Mock Up](#mock-up)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Additional Resources](#additional-resources)

## Usage

To run the application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/gilmerperez/book-search-engine.git`

2. Navigate to the project directory: `cd book-search-engine`

3. Install dependencies for both the front end and back end: `npm install` (from the project root directory)

4. Start the server: `npm run start:dev` (This will start both the client and server)

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Mock-Up

The following images demonstrate how the web application works:

As you can see in the following animation, a user can type a search term for example, "Star Wars" in a search box and the results appear:

![Animation shows "Star Wars" typed into a search box and books about Star Wars appearing as results](./Assets/18-mern-homework-demo-01.gif)

The user can save books by clicking "Save This Book!" under each search result, as shown in the following animation:

![Animation shows user clicking "Save This Book!" button to save books that appear in search results. The button label changes to "Book Already Saved" after it is clicked and the book is saved](./Assets/18-mern-homework-demo-02.gif)

A user can view their saved books on a separate page, as shown in the following animation:

![Animation shows the books that the user has saved](./Assets/18-mern-homework-demo-03.gif)

## Key Features

- **User Authentication**: Users can sign up, log in, and manage their accounts securely.

- **Search Books**: Users can search for books by title or author using the Google Books API.

- **Save Books**: Users can save books to their account for later purchase or reading.

- **View Saved Books**: Users can view and manage their saved books in their personal library.

## Technology Stack

This project utilizes the following technologies:

- **React**: Front-end framework for building the user interface.

- **Node.js**: JavaScript runtime for executing server-side code.

- **Express.js**: Web server for handling client requests and serving the API.

- **MongoDB**: NoSQL database to store user information and saved books.

- **JWT Authentication**: JSON Web Tokens used for secure user authentication.

- **Apollo Server**: A GraphQL server used to handle data fetching and mutation.

- **GraphQL**: A query language for fetching data from the server, replacing the RESTful API.



## Additional Resources

- [GitHub Repository](https://github.com/gilmerperez/book-search-engine)

- [Deployed Application](https://book-search-engine-u2pg.onrender.com)

- [MongoDB Atlas Deployment Guide](https://coding-boot-camp.github.io/full-stack/mongodb/deploy-with-render-and-mongodb-atlas)
