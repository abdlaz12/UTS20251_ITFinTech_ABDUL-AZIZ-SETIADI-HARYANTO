// pages/api/webhook/xendit.js
import dbConnect from '../../../lib/mongodb';
import Order from '../../../models/Order';
import Transaction from '../../../models/Transaction';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Verifikasi webhook callback token (opsional tapi recommended)
    const callbackToken = req.headers['x-callback-token'];
    const webhookToken = process.env.XENDIT_WEBHOOK_TOKEN;

    if (webhookToken && callbackToken !== webhookToken) {
      console.error('Invalid webhook token');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const webhookData = req.body;
    console.log('Webhook received:', webhookData);

    const { external_id, status, id, paid_at, payment_method, payment_channel, amount } = webhookData;

    // Cari order berdasarkan external_id
    const order = await Order.findOne({ externalId: external_id });

    if (!order) {
      console.error('Order not found:', external_id);
      return res.status(404).json({ message: 'Order not found' });
    }

    // Simpan transaksi webhook
    await Transaction.create({
      orderId: order.orderId,
      xenditInvoiceId: id,
      status,
      amount,
      paymentMethod: payment_method,
      paymentChannel: payment_channel,
      paidAt: paid_at ? new Date(paid_at) : null,
      webhookData,
    });

    // Update status order
    if (status === 'PAID') {
      order.paymentStatus = 'paid';
      order.paidAt = new Date(paid_at);
    } else if (status === 'EXPIRED') {
      order.paymentStatus = 'expired';
    } else if (status === 'FAILED') {
      order.paymentStatus = 'failed';
    }

    order.updatedAt = new Date();
    await order.save();

    console.log(`Order ${order.orderId} updated to status: ${order.paymentStatus}`);

    // Kirim response 200 agar Xendit tahu webhook berhasil diproses
    return res.status(200).json({ message: 'Webhook processed successfully' });

  } catch (error) {
    console.error('Webhook Error:', error);
    return res.status(500).json({ message: error.message });
  }
}