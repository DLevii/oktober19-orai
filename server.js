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
    database: process.env.DB_NAME || 'szerviz_db',
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


const {
    osszesJarmu,
    keszJarmuvek,
    jarmuKereses
} = require("./queries/jarmuvek");

// 1. Összes jármű
app.get("/jarmuvek", (req, res) => {
    osszesJarmu(db, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);
    });
});

// 2. Elkészült járművek
app.get("/jarmuvek/kesz", (req, res) => {
    keszJarmuvek(db, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);
    });
});

// 3. Keresés modell alapján
app.get("/jarmuvek/kereses/:szoveg", (req, res) => {
    jarmuKereses(
        db,
        req.params.szoveg,
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(result);
        }
    );
});
