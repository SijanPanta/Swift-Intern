import express from "express";
import {
  getPosts,
  getPostsById,
  deletePost,
  updatePost,
  newPost,
} from "../controllers/postController.js";
const router = express.Router();

//get all post
router.get("/", getPosts);

//get single post
router.get("/:id", getPostsById);

//create new posts
router.post("/", newPost);

//update post
router.put("/:id", updatePost);

//delete a post
router.delete("/:id", deletePost);
export default router;
