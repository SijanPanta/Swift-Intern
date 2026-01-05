const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

// Store all posted data here
let storedData = [];

// Handler functions
const handleHome = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("home page");
};

const handleAbout = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("About Page");
};

const handleGetData = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(storedData));
};

const handlePostData = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    console.log("received:", body);
    try {
      storedData.push(JSON.parse(body));
    } catch (e) {
      storedData.push({ raw: body });
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("data received");
  });
};

const handleDeleteData = (req, res) => {
  storedData = [];
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  console.log("data deleted")
  res.end()
};

const handleNotFound = (req, res) => {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Page not found");
};

// Router function
const router = (req, res) => {
  if (req.url === "/") {
    handleHome(req, res);
  } else if (req.url === "/about") {
    handleAbout(req, res);
  } else if (req.url === "/api/data" && req.method === "GET") {
    handleGetData(req, res);
  } else if (req.url === "/api/data" && req.method === "POST") {
    handlePostData(req, res);
  } else if (req.url === "/api/data" && req.method === "DELETE") {
    handleDeleteData(req, res);
  } else {
    handleNotFound(req, res);
  }
};

const server = http.createServer(router);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
