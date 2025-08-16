const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  teacherName: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  // Path to the stored audio file
  audioPath: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Audio', audioSchema);
