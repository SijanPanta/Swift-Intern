var fs =require("fs");

fs.readFile('./Events/input.txt',(err,data)=>{
    // console.log("inside readFIle")
    if (err){
        // console.log("inside err")
        console.log(err.stack);
        return;
    }
    console.log(data.toString());
});

console.log("program ended");