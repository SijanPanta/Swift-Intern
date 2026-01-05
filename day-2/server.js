const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

// Store the posted data here
let storedData = null;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("home page");
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("About Page");
  } else if (req.url === "/api/data" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    // Return stored data or default data
    const data = storedData || { name: "Sijan", age: 19 };
    res.end(JSON.stringify(data));
  } else if (req.url === "/api/data" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      console.log("received:", body);
      // Store the received data
      try {
        storedData = JSON.parse(body);
      } catch (e) {
        storedData = { raw: body };
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("data received");
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Page not found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});