var events=require ("events");
var eventEmitter = new events.EventEmitter();

eventEmitter.on("print",()=>{
    console.log("print1");
})


eventEmitter.on("print",()=>{
    console.log("print2");
})

eventEmitter.emit("print");
console.log(eventEmitter.listenerCount("print"));