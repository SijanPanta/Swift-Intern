const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const PORT = process.env.PORT || 3030;

// In-memory user storage (use a database in production)
const users = [];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { userName, password } = req.body;

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

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

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

// Get all users 
app.get("/users", (req, res) => {
  const usersWithoutPasswords = users.map((user) => ({
    id: user.id,
    userName: user.userName,
  }));
  res.json({
    success: true,
    users: usersWithoutPasswords,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
