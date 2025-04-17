const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route for root URL
app.get('/', (req, res) => {
    res.json({ message: 'Bearista Cafe API is running' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Handle 404 routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Available routes:');
    console.log('- GET  /');
    console.log('- POST /api/auth/login');
    console.log('- POST /api/auth/register');
    console.log('- GET  /api/auth/me');
    console.log('- POST /api/orders');
    console.log('- GET  /api/orders/my-orders');
});