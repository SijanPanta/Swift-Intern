const http = require("http");

function makeRequest(method, path, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 3000,
      path: path,
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = http.request(options, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        resolve({
          status: res.statusCode,
          data: JSON.parse(body),
        });
      });
    });

    req.on("error", reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function runTests() {
  console.log("Testing Authentication Server...\n");

  console.log("1. Registering user 'alice' with password 'secret123'");
  const register1 = await makeRequest("POST", "/register", {
    username: "alice",
    password: "secret123",
  });
  console.log(`   Status: ${register1.status}`, register1.data, "\n");

  console.log("2. Trying to register 'alice' again (should fail)");
  const register2 = await makeRequest("POST", "/register", {
    username: "alice",
    password: "different",
  });
  console.log(`   Status: ${register2.status}`, register2.data, "\n");

  console.log("3. Logging in with correct password");
  const login1 = await makeRequest("POST", "/login", {
    username: "alice",
    password: "secret123",
  });
  console.log(`   Status: ${login1.status}`, login1.data, "\n");

  console.log("4. Logging in with wrong password");
  const login2 = await makeRequest("POST", "/login", {
    username: "alice",
    password: "wrongpassword",
  });
  console.log(`   Status: ${login2.status}`, login2.data, "\n");

  console.log("5. Logging in with non-existent user");
  const login3 = await makeRequest("POST", "/login", {
    username: "bob",
    password: "anything",
  });
  console.log(`   Status: ${login3.status}`, login3.data, "\n");

  console.log("All tests completed!");
  process.exit(0);
}

runTests().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
