const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MySQL connection
const db = require("./models");

const { User } = require("./models");

app.get("/select", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/insert", (req, res) => {
  User.create({
    firstName: "Sijan",
    age: 21,
  }).catch((err) => {
    if (err) console.log(err);
  });
  res.send("inserted");
});

app.delete("/delete", (req, res) => {
  res.send("delete");
});
//
db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
