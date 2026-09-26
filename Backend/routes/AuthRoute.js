const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");

const SECRET_KEY = process.env.TOKEN_KEY || "zerodha_secret_key_123456";

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email", success: false });
    }

    const user = await UserModel.create({ email, password, username });
    const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, SECRET_KEY, {
      expiresIn: "3d",
    });

    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      token,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error during signup", success: false });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required", success: false });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password", success: false });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ message: "Incorrect email or password", success: false });
    }

    const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, SECRET_KEY, {
      expiresIn: "3d",
    });

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      token,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error during login", success: false });
  }
});

// Verification Route
router.post("/verify", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = req.body.token || (authHeader && authHeader.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ status: false, message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({ status: false, message: "Invalid token" });
    } else {
      const user = await UserModel.findById(data.id);
      if (user) {
        return res.status(200).json({ status: true, username: user.username, email: user.email });
      } else {
        return res.status(404).json({ status: false, message: "User not found" });
      }
    }
  });
});

module.exports = router;
