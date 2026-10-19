
require("dotenv").config();

const express = require("express");
const mysql = require("mysql2/promise");

const {
    osszesJarmu,
    keszJarmuvek,
    jarmuKereses
} = require("./queries/jarmuvek");

const app = express();
const PORT = process.env.PORT || 3000;

const dbConfig = {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3307,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "szerviz_db",
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("A JSON szerver működik!");
});

// 1. Összes jármű
app.get("/jarmuvek", async (req, res) => {
    try {
        const result = await osszesJarmu(pool);

        console.log("Összes jármű:", result);
        res.json(result);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// 2. Elkészült járművek
app.get("/jarmuvek/kesz", async (req, res) => {
    try {
        const result = await keszJarmuvek(pool);

        console.log("Elkészült járművek:", result);
        res.json(result);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// 3. Keresés modell alapján
app.get("/jarmuvek/kereses/:szoveg",
    async (req, res) => {
        try {
            const result = await jarmuKereses(
                pool,
                req.params.szoveg
            );

            console.log("Keresés eredménye:", result);
            res.json(result);

        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: err.message
            });
        }
    }
);

app.listen(PORT, () => {
    console.log(
        `A szerver fut: http://localhost:${PORT}`
    );
});
