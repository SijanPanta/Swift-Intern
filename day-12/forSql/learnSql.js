import mysql from "mysql2/promise";

// Database configuration
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root123",
  database: "testdb",
  port: 3307,
};

// Create connection
const connection = await mysql.createConnection(dbConfig);

console.log("Connected to MySQL database");

// Create a new table
await connection.execute(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);
console.log("Table 'users' created successfully");

// CREATE - Insert new users
await connection.execute(
  "INSERT INTO users (name, email, age) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)",
  [
    "John Doe",
    "john@example.com",
    30,
    "Jane Smith",
    "jane@example.com",
    25,
    "Bob Wilson",
    "bob@example.com",
    35,
  ],
);
console.log("Users inserted successfully");

// READ - Select all users
const [users] = await connection.execute("SELECT * FROM users");
console.log("\nAll users:", users);

// READ - Select specific user
const [specificUser] = await connection.execute(
  "SELECT * FROM users WHERE email = ?",
  ["john@example.com"],
);
console.log("\nSpecific user:", specificUser);

// UPDATE - Update user information
await connection.execute("UPDATE users SET age = ? WHERE email = ?", [
  31,
  "john@example.com",
]);
console.log("\nUser updated successfully");

// READ - Verify update
const [updatedUser] = await connection.execute(
  "SELECT * FROM users WHERE email = ?",
  ["john@example.com"],
);
console.log("Updated user:", updatedUser);

// DELETE - Delete a user
await connection.execute("DELETE FROM users WHERE email = ?", [
  "bob@example.com",
]);
console.log("\nUser deleted successfully");

// READ - Final list of users
const [finalUsers] = await connection.execute("SELECT * FROM users");
console.log("Final users list:", finalUsers);

// Close connection
await connection.end();
console.log("\nConnection closed");
