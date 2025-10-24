// pages/api/admin/orders.js
import dbConnect from '../../../lib/mongodb';
import Order from '../../../models/Order';
import requireAuth from '../../../lib/requireAuth';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });

      const formattedOrders = orders.map(order => ({
        orderId: order.orderId,
        customerName: order.customerName,
        totalAmount: order.totalAmount,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt,
        paidAt: order.paidAt,
      }));

      res.status(200).json({ orders: formattedOrders });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

// true artinya hanya admin yang boleh akses
export default requireAuth(handler, true);
