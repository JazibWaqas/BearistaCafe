const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// Save review - protected route
router.post('/', auth, async (req, res) => {
  try {
    console.log('Received Review:', req.body); 
    console.log('REQ.USER:', req.user)
    
    const { orderNumber, rating, comment, suggestions, recommend } = req.body;

    const newReview = new Review({
      orderNumber,
      name: req.user.fullname,  
      email: req.user.email,
      rating,
      comment,
      suggestions,
      recommend
    });

    await newReview.save();
    res.status(201).json({ msg: 'Review submitted successfully!' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

module.exports = router;
