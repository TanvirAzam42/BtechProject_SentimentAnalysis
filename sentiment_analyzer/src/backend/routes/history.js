const express = require('express');
const History = require('../models/history');
const router = express.Router();

// Route to save history data
router.post('/add', async (req, res) => {
  const { user, totalReviews, positiveReviews, negativeReviews, neutralReviews } = req.body;
  try {
    const newHistory = new History({ user, totalReviews, positiveReviews, negativeReviews, neutralReviews });
    await newHistory.save();
    res.status(201).json({ message: 'History saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save history' });
  }
});

// Route to get history for a user
router.get('/:user', async (req, res) => {
  const { user } = req.params;
  try {
    const userHistory = await History.find({ user });
    res.status(200).json(userHistory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve history' });
  }
});

module.exports = router;
