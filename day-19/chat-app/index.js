const express =require("express");
const http =require("http");
const path =require("path")
const app=express();
const server=http.createServer(app);
const {Server}=require("socket.io")


const io=new Server(server);

io.on("connection",socket=>{
    console.log("A new user is connected",socket.id)
    socket.on("message",message=>{
        message=socket.id+'='+message;
       socket.broadcast.emit('out-msg',message)
    })
})


app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000,()=>{
    console.log("The server is running in port 3000")
})

