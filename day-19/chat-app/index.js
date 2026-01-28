const express =require("express");
const http =require("http");
const path =require("path")
const app=express();
const server=http.createServer(app);


app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000,()=>{
    console.log("The server is running in port 3000")
})