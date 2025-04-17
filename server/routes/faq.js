const express = require('express');
const router = express.Router();
const FAQ = require('../models/FAQ');
const auth = require('../middleware/auth');

// POST /api/faq
router.post('/', auth, async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || question.trim() === '') {
      return res.status(400).json({ msg: 'Question cannot be empty' });
    }

    // Pull from authenticated token
    const name = req.user.fullname;
    const email = req.user.email;

    const newFAQ = new FAQ({
      question,
      name,
      email,
      userId: req.user.id
    });

    await newFAQ.save();
    res.status(201).json({ msg: 'Your question has been submitted!' });
  } catch (err) {
    console.error('FAQ Submit Error:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
