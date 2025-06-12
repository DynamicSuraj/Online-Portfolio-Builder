
const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bio: {
    type: String,
    default: '',
  },
  skills: {
    type: [String],
    default: [],
  },
  experience: {
    type: [{
      company: String,
      role: String,
      duration: String,
    }],
    default: [],
  },
  projects: {
    type: [{
      name: String,
      description: String,
      link: String,
    }],
    default: [],
  },
  profilePicture: {
    type: String,
    default: '/uploads/default.jpg',
  },
  template: {
    type: String,
    enum: ['modern', 'minimal', 'professional'],
    default: 'modern',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
