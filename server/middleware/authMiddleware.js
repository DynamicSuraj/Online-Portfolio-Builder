const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Auth Middleware - Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Auth Middleware - No token provided');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth Middleware - Token decoded:', decoded);
    req.user = decoded; // { id: user_id, isAdmin: boolean }
    next();
  } catch (error) {
    console.error('Auth Middleware - Token verification error:', error.message, error.stack);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
