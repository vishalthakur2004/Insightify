const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// User Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWTSECRET, { expiresIn: "1h" });
    return res.json({ message: "Login successful", token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
