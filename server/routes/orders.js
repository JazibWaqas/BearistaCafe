const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const User = require('../models/User');

// Create new order
router.post('/', auth, async (req, res) => {
    try {
        // console.log('REQ.USER:', req.user);

        const {
            items,
            deliveryDetails,
            totalAmount,
            tax,
            grandTotal,
            paymentMethod = 'Cash on Delivery'
        } = req.body;

        const newOrder = new Order({
            userId: req.user.id,
            name: req.user.fullname,
            email: req.user.email,
            items,
            deliveryDetails,
            totalAmount,
            tax,
            grandTotal,
            paymentMethod
        });

        const savedOrder = await newOrder.save();

        // Update user's orders array
        await User.findByIdAndUpdate(req.user.id, {
            $push: { orders: savedOrder._id },
            $inc: { orderCount: 1 }
        });

        res.json(savedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Server error while creating order' });
    }
});

// Get all orders for a user
router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id })
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error while fetching orders' });
    }
});

// Get specific order by ID
router.get('/:orderId', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Ensure user owns this order
        if (order.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to view this order' });
        }

        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Server error while fetching order' });
    }
});

// Update order status (could be useful for admin functionality later)
router.patch('/:orderId/status', auth, async (req, res) => {
    try {
        const { orderStatus } = req.body;
        
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.orderStatus = orderStatus;
        await order.save();

        res.json(order);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Server error while updating order status' });
    }
});

module.exports = router;