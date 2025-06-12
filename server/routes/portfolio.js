
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Get authenticated user's portfolio
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('GET /api/portfolio - User ID:', req.user?.id);
    if (!req.user?.id) {
      console.log('No user ID in request');
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    const portfolio = await Portfolio.findOne({ userId: req.user.id });
    if (!portfolio) {
      console.log('Portfolio not found for user:', req.user.id);
      return res.status(404).json({ message: 'Portfolio not found. Please create one.' });
    }
    console.log('Portfolio found:', portfolio._id);
    res.json({ portfolio });
  } catch (error) {
    console.error('Error fetching portfolio:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create or update portfolio
router.post('/', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    console.log('POST /api/portfolio - User ID:', req.user.id, 'Body:', req.body);
    const { bio, skills, experience, projects, template } = req.body;
    let profilePicture = req.file ? `/Uploads/${req.file.filename}` : '/Uploads/default.jpg';

    const portfolioData = {
      userId: req.user.id,
      bio,
      skills: JSON.parse(skills || '[]'),
      experience: JSON.parse(experience || '[]'),
      projects: JSON.parse(projects || '[]'),
      profilePicture,
      template: template || 'modern',
    };

    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.user.id },
      portfolioData,
      { upsert: true, new: true }
    );
    console.log('Portfolio saved:', portfolio._id);
    res.json(portfolio);
  } catch (error) {
    console.error('Error saving portfolio:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get public portfolio by username
router.get('/:username', async (req, res) => {
  try {
    console.log('GET /api/portfolio/:username - Username:', req.params.username);
    const user = await User.findOne({ 
      name: new RegExp(`^${req.params.username}$`, 'i') 
    });
    if (!user) {
      console.log('User not found:', req.params.username);
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User found:', user._id);
    const portfolio = await Portfolio.findOne({ userId: user._id });
    if (!portfolio) {
      console.log('Portfolio not found for user:', user._id);
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    console.log('Portfolio found:', portfolio._id);
    res.json({ portfolio, username: user.name });
  } catch (error) {
    console.error('Error fetching public portfolio:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
