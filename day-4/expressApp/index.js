var express = require("express");
var fs = require("fs");
const port = 5000;
var app = express();
app.use(express.json());
app.get("/", (req, res) => {
  fs.readFile("user.json", "utf8", (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

app.get("/:id", (req, res) => {
  fs.readFile("user.json", "utf8", (err, data) => {
    if (err) res.send(err);
    var users = JSON.parse(data);

    var user = users["user" + req.params.id];
    res.end(JSON.stringify(user));
  });
});

app.post("/", (req, res) => {
  fs.readFile("user.json", "utf8", (err, data) => {
    if (err) res.send(err);
    var users = JSON.parse(data);
    const { name, password, profession, id } = req.body;
    const newUserKey = "user" + id;
    if (users[newUserKey]) {
      return res.status(409).json({ error: "User already exists" });
    }
    users[newUserKey] = {
      name,
      password,
      profession,
      id,
    };

    fs.writeFile("user.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to write file" });
      }

      res.status(201).json({
        message: "User added successfully",
        user: users[newUserKey],
      });
    });
  });
});
var server = app.listen(port, () => {
  console.log("app is running in port:" + port);
});
