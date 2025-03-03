import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

// Function to establish a connection to the MongoDB database
const db = async (): Promise<typeof mongoose.connection> => {
  try {
    // Connect to the MongoDB database using Mongoose
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected.');
    return mongoose.connection; // Return the database connection instance
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed.');
  }
};

// Export the database connection function for use in other parts of the application
export default db;
