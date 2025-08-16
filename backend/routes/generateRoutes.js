const express = require("express");
const { summarizeLecture, generateQuestions } = require("../utils/summarization");
const multer = require("multer");
const router = express.Router();

const upload2 = multer({ dest: "uploads2/" });
// Summarize Lecture
// router.post("/transcribe", upload2.single("audio"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }
//     const audioPath = req.file.path;

//     const content = await transcribeLecture(audioPath);
//     console.log(audioPath)
//     res.json({ content });
//   } catch (error) {
//     console.error("Summarization Error:", error);
//     res.status(500).json({ error: "Failed to summarize lecture." });
//   }
// });

router.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body; // Fix: Correctly extract text
    if (!text) {
      return res.status(400).json({ error: "No text provided for summarization." });
    }
    const summary = await summarizeLecture(text);
    res.json({ summary });
  } catch (error) {
    console.error("Summarization Error:", error);
    res.status(500).json({ error: "Failed to summarize lecture." });
  }
});

// Generate Questions
router.post("/generate-questions", async (req, res) => {
  try {
    const { summary } = req.body; // Fix: Correctly extract summary
    if (!summary) {
      return res.status(400).json({ error: "No summary provided for question generation." });
    }
    const questions = await generateQuestions(summary);
    res.json({ questions });
  } catch (error) {
    console.error("Question Generation Error:", error);
    res.status(500).json({ error: "Failed to generate questions." });
  }
});

module.exports = router;
