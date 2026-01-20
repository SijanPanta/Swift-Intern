import mysql from "mysql2/promise";

// Database configuration
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "", // Empty password - try this first
  database: "practiceDB",
};

// Create connection
const connection = await mysql.createConnection(dbConfig);

console.log("Connected to MySQL database");

// Execute a simple query
const [rows] = await connection.execute("SELECT id,name,gender from CUSTOMERS");

console.log("Query result:", rows);

// Close connection
await connection.end();
console.log("Connection closed");
