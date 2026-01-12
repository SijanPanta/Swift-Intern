import express from "express";
import bcrypt from "bcrypt";

const login = express.Router();

login.post("/", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const users = req.app.get("users");

    // Validation
    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Find user
    const user = users.find((user) => user.userName === userName);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Login successful
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        userName: user.userName,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

export default login;
