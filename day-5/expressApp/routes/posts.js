import express from "express";
const router = express.Router();

let posts = [
  { id: 1, title: "Post one" },
  { id: 2, title: "Post two" },
  { id: 3, title: "Post three" },
];


//get all post
router.get("/",(req, res) => {
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

//create new posts
router.post("/",(req,res)=>{
    const newPost={
        id:posts.length+1,
        title:req.body.title
    };
    if(!newPost.title){
        res.status(400).json({message:"include a title"})
    }
    else{
        posts.push(newPost)
    }
    res.status(201).json(posts);
});

//update post
router.put("/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const post=posts.find(post=>post.id===id);
   if(req.body.title){
    post.title=req.body.title;
   }else{
    return res.status(400).json({error:"Enter title"})
   }
    res.status(200).json(posts);
})

//delete a post
router.delete("/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const post=posts.find(post=>post.id===id);
    if(!post){
      return  res.status(404).json({message:"not found"});
    }
    posts=posts.filter(post=>post.id!=id);
    res.json(posts);
})
export default router;
