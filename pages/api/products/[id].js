import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  const token = req.headers.authorization?.split(' ')[1];
  let user = null;
  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }

  const { id } = req.query;

  switch (req.method) {
    // 🟡 PUT → update produk (admin only)
    case 'PUT': {
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: admin only' });
      }

      const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: 'Product not found' });
      return res.status(200).json({ message: 'Product updated', product: updated });
    }

    // 🔴 DELETE → hapus produk (admin only)
    case 'DELETE': {
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: admin only' });
      }

      const deleted = await Product.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: 'Product not found' });
      return res.status(200).json({ message: 'Product deleted' });
    }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
