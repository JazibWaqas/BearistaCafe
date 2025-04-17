const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Register User
// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { fullname, email, password, phone } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      fullname,
      email,
      password,
      phone,
      location: '',
      orderCount: 0,
      voucherCodes: []
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname
      }
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login User
// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please provide email and password' });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials - user not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials - wrong password' });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname
      }
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          console.error('JWT Error:', err.message);
          return res.status(500).json({ msg: 'Token creation failed' });
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Get User Profile
// GET /api/auth/me
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update User Profile
// PUT /api/auth/update
router.put('/update', auth, async (req, res) => {
  try {
    const { phone, location } = req.body;
    
    // Find user by id
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update fields if provided
    if (phone) user.phone = phone;
    if (location !== undefined) user.location = location;

    // Save updated user
    await user.save();

    // Return updated user without password
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json(updatedUser);
  } catch (err) {
    console.error('Update Error:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Add Voucher Code
// POST /api/auth/voucher
router.post('/voucher', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Increment order count
    user.orderCount += 1;

    // Check if user should get a new voucher (every 10 orders)
    if (user.orderCount % 10 === 0) {
      const voucherCode = `COFFEE${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      user.voucherCodes.push({
        code: voucherCode,
        isUsed: false,
        createdAt: new Date()
      });
    }

    await user.save();
    res.json(await User.findById(req.user.id).select('-password'));
  } catch (err) {
    console.error('Voucher Error:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Use Voucher
// PUT /api/auth/voucher/use
router.put('/voucher/use', auth, async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Find the voucher
    const voucherIndex = user.voucherCodes.findIndex(v => v.code === code && !v.isUsed);
    if (voucherIndex === -1) {
      return res.status(400).json({ msg: 'Invalid or used voucher code' });
    }

    // Mark voucher as used
    user.voucherCodes[voucherIndex].isUsed = true;
    await user.save();

    res.json(await User.findById(req.user.id).select('-password'));
  } catch (err) {
    console.error('Use Voucher Error:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;