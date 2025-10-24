// pages/api/admin/stats.js
import dbConnect from '../../../lib/mongodb';
import Order from '../../../models/Order';
import requireAuth from '../../../lib/requireAuth';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      // Hanya ambil order yang sudah dibayar
      const orders = await Order.find({ paymentStatus: 'paid' });

      // Total omzet per bulan
      const monthlySales = {};
      orders.forEach(order => {
        const month = new Date(order.paidAt).toLocaleString('id-ID', { month: 'long', year: 'numeric' });
        monthlySales[month] = (monthlySales[month] || 0) + order.totalAmount;
      });

      // Total omzet per hari (7 hari terakhir)
      const dailySales = {};
      orders.forEach(order => {
        const date = new Date(order.paidAt).toISOString().split('T')[0];
        dailySales[date] = (dailySales[date] || 0) + order.totalAmount;
      });

      res.status(200).json({ monthlySales, dailySales });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default requireAuth(handler, true);
