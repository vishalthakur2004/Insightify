const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const lectureRoutes = require("./routes/lectureRoutes");
const getLecture = require("./routes/lectureRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const generateRoutes= require("./routes/generateRoutes");
const path = require("path");
const contactRoutes = require('./routes/contact');
const dotenv =  require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({origin:process.env.ORIGINS, credentials: true}));

app.use(express.urlencoded({ extended: true }));


// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", authRoutes);
app.use("/api", lectureRoutes);
app.use("/upload", uploadRoutes);
app.use("/generate", generateRoutes);
app.use('/contact', contactRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
