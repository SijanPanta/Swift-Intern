import express from "express";
import { AppError, asyncHandler, errorHandler } from "./customException.js";

// Simulated database
const users = [
  { id: 1, email: "john@example.com", password: "pass123", name: "John Doe" },
  { id: 2, email: "jane@example.com", password: "pass456", name: "Jane Smith" },
];

// User Service Functions
const userService = {
  // Get all users
  getAllUsers: async () => {
    try {
      // Simulate database query
      return users;
    } catch (error) {
      throw new AppError("Failed to fetch users", 500);
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    // Validate input
    if (!id || isNaN(id)) {
      throw new AppError("User ID must be a valid number", 400);
    }

    const user = users.find((u) => u.id === parseInt(id));

    if (!user) {
      throw new AppError(`User with ID ${id} not found`, 404);
    }

    // Don't send password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  // Create new user
  createUser: async (userData) => {
    const { email, password, name } = userData;

    // Validation
    if (!email || !password || !name) {
      throw new AppError("Email, password, and name are required", 400);
    }

    if (!email.includes("@")) {
      throw new AppError("Invalid email format", 400);
    }

    if (password.length < 6) {
      throw new AppError("Password must be at least 6 characters", 400);
    }

    // Check if user exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      throw new AppError("User with this email already exists", 400);
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      email,
      password,
      name,
    };

    users.push(newUser);

    // Return without password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  // Authenticate user
  authenticateUser: async (email, password) => {
    // Validation
    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const user = users.find((u) => u.email === email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    if (user.password !== password) {
      throw new AppError("Invalid email or password", 401);
    }

    // Return without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  // Update user
  updateUser: async (id, updateData) => {
    if (!id || isNaN(id)) {
      throw new AppError("User ID must be a valid number", 400);
    }

    const userIndex = users.findIndex((u) => u.id === parseInt(id));

    if (userIndex === -1) {
      throw new AppError(`User with ID ${id} not found`, 404);
    }

    // Validate email if provided
    if (updateData.email && !updateData.email.includes("@")) {
      throw new AppError("Invalid email format", 400);
    }

    // Update user
    users[userIndex] = { ...users[userIndex], ...updateData };

    const { password, ...userWithoutPassword } = users[userIndex];
    return userWithoutPassword;
  },

  // Delete user
  deleteUser: async (id) => {
    if (!id || isNaN(id)) {
      throw new AppError("User ID must be a valid number", 400);
    }

    const userIndex = users.findIndex((u) => u.id === parseInt(id));

    if (userIndex === -1) {
      throw new AppError(`User with ID ${id} not found`, 404);
    }

    const deletedUser = users.splice(userIndex, 1)[0];
    const { password, ...userWithoutPassword } = deletedUser;
    return userWithoutPassword;
  },
};

// Express Application
const app = express();
app.use(express.json());

// Get all users
app.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();
    res.json({ success: true, data: users });
  }),
);

// Get user by ID
app.get(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    res.json({ success: true, data: user });
  }),
);

// Create new user
app.post(
  "/users",
  asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
  }),
);

// Login
app.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.authenticateUser(email, password);
    res.json({ success: true, data: user, message: "Login successful" });
  }),
);

// Update user
app.put(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ success: true, data: user });
  }),
);

// Delete user
app.delete(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const user = await userService.deleteUser(req.params.id);
    res.json({ success: true, data: user, message: "User deleted" });
  }),
);

// 404 handler for undefined routes
app.use((req, res, next) => {
  throw new AppError(`Route ${req.originalUrl} not found`, 404);
});

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
  console.log("\nAvailable endpoints:");
  console.log("GET    /users       - Get all users");
  console.log("GET    /users/:id   - Get user by ID");
  console.log("POST   /users       - Create new user");
  console.log("POST   /login       - Login user");
  console.log("PUT    /users/:id   - Update user");
  console.log("DELETE /users/:id   - Delete user");
});
