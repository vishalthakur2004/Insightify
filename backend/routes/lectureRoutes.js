const express = require("express");
const { summarizeLecture, generateQuestions } = require("../utils/summarization");
const Lecture = require("../models/Lecture");

const router = express.Router();


router.post("/uploadlecture", async(req,res)=>{
  try {
    const { subject, teacher, content,summary,question,dateTime,audioPath } = req.body;
    const newLecture = new Lecture({
      subject,
      teacher,
      content,
      summary,
      question,
      dateTime,
      audioPath
    });
    await newLecture.save();
    res.status(201).json({ message: "Lecture uploaded successfully!", lecture: newLecture });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Failed to upload lecture." });
  }
});

router.get("/getlecture", async (req, res) => {
  try {
    const lectures = await Lecture.find(); 
    return res.json({ lectures });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});


router.get("/getfulllecture/:id", async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });
    res.json(lecture.content);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


router.get("/getsummarize/:id", async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });
    res.json(lecture.summary);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


router.get("/getquestions/:id", async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });
    res.json(lecture.question);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
