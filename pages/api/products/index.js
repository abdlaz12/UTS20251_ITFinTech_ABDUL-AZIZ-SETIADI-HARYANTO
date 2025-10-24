import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  // 🔒 Middleware sederhana untuk validasi admin (optional, bisa dihapus untuk umum)
  const token = req.headers.authorization?.split(' ')[1];
  let user = null;
  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }

  switch (req.method) {
    // 🟢 GET → ambil semua produk
    case 'GET': {
      const products = await Product.find().sort({ createdAt: -1 });
      return res.status(200).json({ products });
    }

    // 🟡 POST → tambah produk baru (hanya admin)
    case 'POST': {
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: admin only' });
      }

      const { name, description, price, image, category, stock } = req.body;
      if (!name || !price) {
        return res.status(400).json({ message: 'Name and price required' });
      }

      const newProduct = await Product.create({
        name,
        description,
        price,
        image: image || '/uploads/default.jpg',
        category,
        stock,
      });
      return res.status(201).json({ message: 'Product created', product: newProduct });
    }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
