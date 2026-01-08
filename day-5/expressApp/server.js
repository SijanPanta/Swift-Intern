const express = require("express");
const app = express();
const port = process.env.PORT || 3030;
let posts = [
  { id: 1, title: "Post one" },
  { id: 2, title: "Post two" },
  { id: 3, title: "Post three" },
];

//get all post
app.get("/api/posts", (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    res.json(posts.slice(0, limit));
  } else {
    res.json(posts);
  }
});

app.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  res.json(posts.filter((post) => post.id == id));
});

app.listen(port, () => {
  console.log("app is running in port:" + port);
});
