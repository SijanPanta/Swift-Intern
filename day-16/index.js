const express = require("express");

const app = express();
// const PORT = 3000;

// // Middleware
app.use(express.json());

// // MySQL connection
// const db = require("./models");
const {sequelize, Student } = require("./models");

app.post("/",async (req,res)=>{
  const {name,age,subject}=req.body;
  try{
   const user= await Student.create({
      name,age,subject
    })
    return res.json(user)
  }
  catch(err){
    return res.status(500).json(err);
  }
})
// app.get("/select", async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get("/insert", (req, res) => {
//   User.create({
//     firstName: "Sijan",
//     age: 21,
//   }).catch((err) => {
//     if (err) console.log(err);
//   });
//   res.send("inserted"+ User);
// });

// app.delete("/delete", (req, res) => {
//   res.send("delete");
// });
// //
// db.sequelize.sync().then((req) => {
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// });

app.listen({port:3000},async()=>{
console.log("server is running on port 3000")
  await sequelize.sync({force:true});
  console.log("Database synced")
})

