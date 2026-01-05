const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

// Store all posted data here
let storedData = [];

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
    // Return all stored data
    res.end(JSON.stringify(storedData));
  } else if (req.url === "/api/data" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      console.log("received:", body);
      // Add the received data to the array
      try {
        storedData.push(JSON.parse(body));
      } catch (e) {
        storedData.push({ raw: body });
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("data received");
    });
  } else if (req.url === "/api/data" && req.method === "DELETE") {
    storedData = [];
    res.statusCode = 204;
    res.end("Data Deleted");
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Page not found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
