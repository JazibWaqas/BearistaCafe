const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,ref: 'User',    required: true},
    name: { type: String, required: true },  // Add name here
    email: { type: String, required: true },
  
    items: [{
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
    image: String,
    size: String,
    milk: String,
    sweetness: String,
    instructions: String,
    isDIY: Boolean,
    diyDetails: {
      base: String,
      milk: String,
      syrups: [String],
      extras: [String]
    }
  }],
  deliveryDetails: {
    customerName: String,
    contactInfo: String,
    area: String,
    detailedAddress: String
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    default: 'Cash on Delivery'
  },
  totalAmount: Number,
  tax: Number,
  grandTotal: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);