const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  totalReviews: { type: Number, required: true },
  positiveReviews: { type: Number, required: true },
  negativeReviews: { type: Number, required: true },
  neutralReviews: { type: Number, required: true },
});

module.exports = mongoose.model('History', historySchema);

