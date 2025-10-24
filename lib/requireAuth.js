// lib/requireAuth.js
import { verifyToken } from './auth';

export default function requireAuth(handler, requireAdmin = false) {
  return async (req, res) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);

      if (!decoded) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }

      // Jika route butuh admin dan role bukan admin → tolak
      if (requireAdmin && decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admin access only' });
      }

      // Tambahkan data user ke req agar bisa dipakai di handler
      req.user = decoded;

      return handler(req, res);
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(500).json({ message: 'Authentication failed' });
    }
  };
}
