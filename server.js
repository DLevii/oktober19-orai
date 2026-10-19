const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3307,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '_db',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

app.use(express.json());
app.get("/", (req, res) => {
    res.send("A JSON szerver működik!");
});
app.listen(PORT, () => {
    console.log(`A szerver fut: http://localhost:${PORT}`);
});
