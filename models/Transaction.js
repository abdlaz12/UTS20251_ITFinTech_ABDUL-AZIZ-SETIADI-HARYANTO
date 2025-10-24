// models/Transaction.js
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  xenditInvoiceId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: String,
  paymentChannel: String,
  paidAt: Date,
  webhookData: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);