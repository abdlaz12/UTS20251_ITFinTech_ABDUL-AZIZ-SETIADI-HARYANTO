// backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    name: String,
    qty: Number,
    price: Number
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'PENDING' // Status awal setiap pesanan
  },
  externalId: { // ID dari invoice Xendit
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);