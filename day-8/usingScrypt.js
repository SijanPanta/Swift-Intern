const express = require("express");
const crypto = require("crypto");

const app = express();
const users = {};

const PORT = 3000;

app.use(express.json());

function hashPassword(password, salt, callback) {
  crypto.scrypt(password, salt, 64, (err, derivedKey) => {
    if (err) callback(err);
    else callback(null, derivedKey.toString("hex"));
  });
}

app.get("/", (req, res) => {
  res.send(`
    <h1>Auth Server with Scrypt</h1>
    <p>Available endpoints:</p>
    <ul>
      <li>POST /register - Register a new user</li>
      <li>POST /login - Login with existing user</li>
    </ul>
    <p>Registered users: ${Object.keys(users).join(", ") || "None"}</p>
  `);
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  if (users[username]) {
    return res.status(409).json({ error: "User already exists" });
  }

  const salt = crypto.randomBytes(16).toString("hex");

  hashPassword(password, salt, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: "Server error" });
    }

    users[username] = { salt, hash };

    res.status(201).json({
      message: "User registered successfully",
      username: username,
    });
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const user = users[username];

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  hashPassword(password, user.salt, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: "Server error" });t
    }

    if (hash === user.hash) {
      res.status(200).json({
        message: "Login successful",
        username: username,
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
