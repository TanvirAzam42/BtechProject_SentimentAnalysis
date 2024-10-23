const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware setup
app.use(cors());
app.use(express.json());

// Define a simple root route
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Use auth routes for signup and login
app.use('/api/auth', authRoutes);

// MongoDB connection setup (Updated)
mongoose.connect('mongodb+srv://zafardakhani:Pass%40123@sentiment.zk1gi.mongodb.net/sentiment?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message); // Better error logging
  });

// Global error handler for unhandled routes
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
