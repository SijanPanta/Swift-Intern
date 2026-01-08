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
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
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

app.delete("/:id", (req, res) => {
  fs.readFile("user.json", (err, data) => {
    if (err) res.json({ error: "couldnt read file" });
    var data = JSON.parse(data);
    delete data["user" + req.params.id];
    res.json({ erroor: "data deleted" });
  });
});

app.patch("/:id", (req, res) => {
  fs.readFile("user.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "couldn't read file" });
    
    var users = JSON.parse(data);
    const userKey = "user" + req.params.id;
    
    if (!users[userKey]) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Update only the fields provided in req.body
    const { name, password, profession } = req.body;
    if (name) users[userKey].name = name;
    if (password) users[userKey].password = password;
    if (profession) users[userKey].profession = profession;
    
    fs.writeFile("user.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to write file" });
      }
      res.json({ 
        message: "User updated successfully",
        user: users[userKey]
      });
    });
  });
});

var server = app.listen(port, () => {
  console.log("app is running in port:" + port);
});
