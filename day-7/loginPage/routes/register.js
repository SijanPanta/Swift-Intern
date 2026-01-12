import express from "express";
import bcrypt from "bcrypt";

const register = express.Router();

register.post("/", async (req, res) => {
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

    // Check if user already exists
    const existingUser = users.find((user) => user.userName === userName);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store user
    const newUser = {
      id: users.length + 1,
      userName,
      password: hashedPassword,
    };
    users.push(newUser);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser.id,
        userName: newUser.userName,
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

export default register;
