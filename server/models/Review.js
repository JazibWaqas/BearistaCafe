const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  orderNumber: String,
  name: { type: String, required: true },
  email: String,
  rating: Number,
  comment: { type: String, required: true },
  suggestions: String,
  recommend: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false }); // Optional: remove __v

module.exports = mongoose.model('Review', ReviewSchema);
