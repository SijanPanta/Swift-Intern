import express from "express";
const router = express.Router();

let posts = [
  { id: 1, title: "Post one" },
  { id: 2, title: "Post two" },
  { id: 3, title: "Post three" },
];

//get all post
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }

  res.json(posts);
});

//get single post
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const post = posts.find((post) => post.id == id);
  if (!post) {
    return res.status(404).json({ msg: id + " not found" });
  }
  res.status(200).json(post);
});

export default router;
