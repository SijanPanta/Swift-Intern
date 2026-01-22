import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
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
const data = [
  ["John Doe", "john@example.com", 30],
  ["Jane Smith", "jane@example.com", 25],
  ["Bob Wilson", "bob@example.com", 35],
];
// CREATE - Insert new users
await connection.query("INSERT INTO users (name, email, age) VALUES ?", [data]);
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

// let arr = [
//   [1, 2, 3],
//   ["a", "b", "c"],
// ];

// const [nums,letters]=arr;
// console.log(nums,letters);
