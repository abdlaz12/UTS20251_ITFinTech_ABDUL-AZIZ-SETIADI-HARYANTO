// lib/auth.js
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // ubah di .env nanti

// Generate token
export function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    SECRET,
    { expiresIn: '7d' }
  );
}

// Verifikasi token
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}
