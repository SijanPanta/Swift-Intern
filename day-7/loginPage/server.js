import express from "express";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 3030;

// In-memory user storage (use a database in production)
const users = [];
app.set("users", users);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
