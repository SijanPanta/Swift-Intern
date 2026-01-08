import express from "express";
import posts from "./routes/posts.js";

const app = express();
const port = process.env.PORT || 3030;

app.use("/api/posts", posts);

app.listen(port, () => {
  console.log("app is running in port:" + port);
});
