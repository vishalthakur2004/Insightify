const express = require("express");
const Audio = require("../models/Audio");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Filter to accept only audio files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an audio file"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Controller Function for Uploading Audio
const uploadAudio = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: "No audio file uploaded" });
    }

    // Ensure the dateTime is valid by converting it to a Date
    const dateValue = req.body.dateTime ? new Date(req.body.dateTime) : Date.now();
    
    const newAudio = new Audio({
      subject: req.body.subject,
      teacherName: req.body.teacherName,
      dateTime: dateValue,
      audioPath: req.file.path,
    });

    const savedAudio = await newAudio.save();
    res.status(201).json({
      message: "Audio uploaded successfully",
      audio: savedAudio,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller Function for Fetching Audio
const getAudio = async (req, res) => {
  try {
    const audio = await Audio.findById(req.params.id);
    if (!audio) {
      return res.status(404).json({ message: "Audio not found" });
    }
    const filePath = path.resolve(audio.audioPath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }
    res.sendFile(filePath);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Define Routes
router.post("/audio", upload.single("audio_data"), uploadAudio);
router.get("/audio/:id", getAudio);

module.exports = router;
