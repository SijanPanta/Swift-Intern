import express from "express";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js"
const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(logger);
console.log("after logger")
app.use("/api/posts", posts);

app.use((req,res,next)=>{
const error=new Error("Not Found");
error.status=404;
 next(error);
})
app.use(errorHandler);
app.listen(port, () => {
  console.log("app is running in port:" + port);
});
 
