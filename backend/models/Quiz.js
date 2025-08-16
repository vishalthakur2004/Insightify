const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  lectureId: { type: mongoose.Schema.Types.ObjectId, ref: "Lecture", required: true },
  questions: { type: Array, required: true },
});

module.exports = mongoose.model("Quiz", QuizSchema);
