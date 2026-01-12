import express from "express";

const usersRouter = express.Router();

// Get all users (for testing)
usersRouter.get("/", (req, res) => {
  const users = req.app.get("users");
  const usersWithoutPasswords = users.map((user) => ({
    id: user.id,
    userName: user.userName,
  }));
  res.json({
    success: true,
    users: usersWithoutPasswords,
  });
});

export default usersRouter;
