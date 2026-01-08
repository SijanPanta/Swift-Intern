import express from "express";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(logger);
app.use("/api/posts", posts);

app.listen(port, () => {
  console.log("app is running in port:" + port);
});
 