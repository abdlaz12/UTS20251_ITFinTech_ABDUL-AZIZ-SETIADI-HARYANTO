// pages/api/test-user.js
import dbConnect from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { name, email, password, role } = req.body;
      const newUser = await User.create({ name, email, password, role });
      res.status(201).json({ message: 'User created', user: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
