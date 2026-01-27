const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
const { sequelize, Student,Post } = require("./models");
app.post("/", async (req, res) => {
  const { name, age, subject, address,email } = req.body;
  try {
    const user = await Student.create({
      name,
      age,
      subject,
      address,
      email
    });
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get("/", async (req, res) => {
  try {
    const users = await Student.findAll();
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

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Student.findOne({
      where: { id },
    });
    return res.json(user);
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
