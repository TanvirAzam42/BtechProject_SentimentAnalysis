const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const historyRoutes = require('./routes/history');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware setup
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/history', historyRoutes);

// MongoDB connection
mongoose.connect('mongodb+srv://zafardakhani:Pass%40123@sentiment.zk1gi.mongodb.net/sentiment?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB:', error.message));

// Error handler for unhandled routes
app.use((req, res) => res.status(404).send('Route not found'));

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
