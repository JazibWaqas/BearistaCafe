const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add item to cart
router.post('/add', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const newItem = {
      productId: req.body.id,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      image: req.body.image,
      size: req.body.size,
      milk: req.body.milk,
      sweetness: req.body.sweetness,
      instructions: req.body.instructions,
      isDIY: req.body.isDIY,
      diyDetails: req.body.diyDetails
    };

    // Check if item already exists
    const itemIndex = cart.items.findIndex(item => 
      item.productId === newItem.productId && 
      item.size === newItem.size && 
      item.milk === newItem.milk
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += newItem.quantity;
    } else {
      cart.items.push(newItem);
    }

    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update cart item quantity
router.put('/update/:itemId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    const itemIndex = cart.items.findIndex(item => item._id.toString() === req.params.itemId);
    
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = req.body.quantity;
      cart.updatedAt = Date.now();
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ msg: 'Item not found' });
    }
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Remove item from cart
router.delete('/remove/:itemId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    cart.items = [];
    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;