// Tes untuk admin
import requireAuth from '../../../lib/requireAuth';

async function handler(req, res) {
  res.status(200).json({
    message: 'Access granted',
    user: req.user,
  });
}

// true = hanya bisa diakses oleh admin
export default requireAuth(handler, true);
