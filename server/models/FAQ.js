const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  name: {                     // 👈 full name of the user
    type: String,
    required: true
  },
  email: {                    // 👈 email of the user
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FAQ', FAQSchema);
