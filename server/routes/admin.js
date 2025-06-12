
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Added for ObjectId validation
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Get all users (admin only)
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log('GET /api/admin/users - Admin ID:', req.user.id);
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message, error.stack);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user
router.put('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, email, isAdmin } = req.body;
    console.log('PUT /api/admin/users/:id - Admin ID:', req.user.id, 'Target ID:', req.params.id, 'Data:', { name, email, isAdmin });
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, isAdmin },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User updated:', user._id);
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error.message, error.stack);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user (admin only, cannot delete self)
router.delete('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log('DELETE /api/admin/users/:id - Admin ID:', req.user.id, 'Target ID:', req.params.id);
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log('Invalid user ID:', req.params.id);
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Prevent self-deletion
    if (req.user.id.toString() === req.params.id) {
      console.log('Attempt to delete self');
      return res.status(400).json({ message: 'Cannot delete yourself' });
    }

    // Delete user
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      console.log('User not found:', req.params.id);
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete associated portfolios
    const deleteResult = await Portfolio.deleteMany({ userId: req.params.id });
    console.log('User deleted:', req.params.id, 'Portfolios deleted:', deleteResult.deletedCount);

    res.json({ message: 'User and associated portfolios deleted' });
  } catch (error) {
    console.error('Error deleting user:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      name: error.name
    });
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
