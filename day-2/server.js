const http = require("http");
const { json } = require("stream/consumers");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
if(req.url==="/"){
    res.end("home page");
}else if (req.url==="/about"){
    res.end("About Page")}
    else if (req.url==="/api/data"){
        res.setHeader("Content-Type","application/json");
        res.end(JSON.stringify({Name:"Sijan",Age:"19"}));
    }
    else{
        res.statusCode=404;
        res.end("Page not found");
    }
}
);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
