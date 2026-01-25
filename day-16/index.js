const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MySQL connection
const db = require("./models")

//    
db.sequelize.sync().then((req)=>{

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
})
// Start server
