// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Token en header Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password'); // ✅ ESTO ES CRUCIAL

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'No autorizado, token inválido' });
    }
  } else {
    return res.status(401).json({ message: 'No autorizado, sin token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
    next();
  } else {
    res.status(403).json({ message: 'No autorizado como admin' });
  }
};

module.exports = { protect, admin };