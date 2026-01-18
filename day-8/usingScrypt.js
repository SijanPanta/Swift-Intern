const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const app = express();
const users = {};

const PORT = 3000;
const JWT_SECRET = crypto.randomBytes(32).toString("hex");

app.use(express.json());

function hashPassword(password, salt, callback) {
  crypto.scrypt(password, salt, 64, (err, derivedKey) => {
    if (err) callback(err);
    else callback(null, derivedKey.toString("hex"));
  });
}

// Encrypt sensitive user data
function encrypt(text) {
  const algorithm = "aes-256-cbc";
  const key = crypto.scryptSync(JWT_SECRET, "salt", 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

// Decrypt sensitive user data
function decrypt(text) {
  const algorithm = "aes-256-cbc";
  const key = crypto.scryptSync(JWT_SECRET, "salt", 32);
  const parts = text.split(":");
  const iv = Buffer.from(parts[0], "hex");
  const encryptedText = parts[1];
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
}

app.get("/", (req, res) => {
  res.send(`
    <h1>Auth Server with Scrypt & JWT</h1>
    <p>Available endpoints:</p>
    <ul>
      <li>POST /register - Register a new user (with optional email)</li>
      <li>POST /login - Login and get JWT token</li>
      <li>GET /profile - Get user profile (requires token)</li>
    </ul>
    <p>Registered users: ${Object.keys(users).join(", ") || "None"}</p>
  `);
});

app.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ error: "Username password and email required" });
  }

  if (users[username]) {
    return res.status(409).json({ error: "User already exists" });
  }

  const salt = crypto.randomBytes(16).toString("hex");

  hashPassword(password, salt, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: "Server error" });
    }

    // Store user with encrypted email (if provided)
    users[username] = {
      salt,
      hash,
      email: encrypt(email),
    };

    res.status(201).json({
      message: "User registered successfully",
      username: username,
      encryptedEmail: users[username].email,
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
      return res.status(500).json({ error: "Server error" });
    }
    if (hash === user.hash) {
      // Generate JWT token
      const token = jwt.sign({ username: username }, JWT_SECRET, {
        expiresIn: "1h",
      });

      // Decrypt user data for response
      const userData = {
        username: username,
        email: user.email ? decrypt(user.email) : null,
      };

      res.status(200).json({
        message: "Login successful",
        token: token,
        user: userData,
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

// Protected route example
app.get("/profile", authenticateToken, (req, res) => {
  const user = users[req.user.username];

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    username: req.user.username,
    email: user.email ? decrypt(user.email) : null,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
