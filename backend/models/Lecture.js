const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  teacher: { type: String, required: true },
  content: { type: String },
  summary: { type: String },
  question: { type: String },
  dateTime:{type:Date},
  audioPath: {type: String},
});

module.exports = mongoose.model("Lecture", LectureSchema);
