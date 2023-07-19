const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  weight: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  bmi: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Calculation', calculationSchema);
