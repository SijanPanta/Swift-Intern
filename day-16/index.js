const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
const { sequelize, Student, Post } = require("./models");
const student = require("./models/student");

app.post("/", async (req, res) => {
  const { name, age, subject, address, email } = req.body;
  // if(!name||!email){
  //   return res.status(400).json({error:"name and email is required"})
  // }
  try {
    const user = await Student.create({
      name,
      age,
      subject,
      address,
      email,
    });
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get("/", async (req, res) => {
  try {
    const users = await Student.findAll({
      include: "posts",
    });
    return res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get("/debug/schema", async (req, res) => {
  try {
    const schema = await sequelize
      .getQueryInterface()
      .describeTable("students");
    res.json(schema);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/posts", async (req, res) => {
  const { userUuid, body } = req.body;

  try {
    const user = await Student.findOne({ where: { uuid: userUuid } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const post = await Post.create({ body, studentId: user.id });
    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [student],
    });
    return res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Student.findOne({
      where: { id },
      include: "posts",
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Student.findOne({
      where: { id },
    });
    await user.destroy();
    return res.json({ message: "user deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.delete("/truncate", async (req, res) => {
  try {
    await Student.destroy({ truncate: true });
    res.json({ message: "All students deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { address, age } = req.body;
  try {
    const user = await Student.findOne({
      where: { id },
    });
    user.address = address;
    user.age = age;
    await user.save();
    return res.json({ message: "user updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.listen(PORT, async () => {
  console.log("server is running on port 3000");
  console.log(
    "DB config:",
    sequelize.config.database,
    sequelize.config.host,
    sequelize.config.port,
  );
  await sequelize.authenticate();
  console.log("Database Connected");
});
