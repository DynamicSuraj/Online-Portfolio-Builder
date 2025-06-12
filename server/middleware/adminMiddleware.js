
const adminMiddleware = (req, res, next) => {
  console.log('Admin Middleware - Checking isAdmin for user:', req.user.id);
  if (!req.user.isAdmin) {
    console.log('Admin Middleware - Access denied, user is not admin');
    return res.status(403).json({ message: 'Access denied, admin only' });
  }
  console.log('Admin Middleware - Access granted');
  next();
};

module.exports = adminMiddleware;
