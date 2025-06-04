const express = require("express");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT0 = 5000;
const PORT1 = 5001;

app.use(cors());
app.use(express.json());

// 📌 ログデータを取得するAPI
app.get("/api/logs", (res) => {
    let logs = [];
    fs.createReadStream(LOG_FILE)
        .pipe(csv())
        .on("data", (row) => logs.push(row))
        .on("end", () => {
            res.json(logs);
        });
});

// 📌 Shodan APIでIP情報を取得するAPI
app.get("/api/shodan/:ip", async (req, res) => {
    const ip = req.params.ip;
    const SHODAN_API_KEY = process.env.SHODAN_API_KEY;
    try {
        const response = await axios.get(`https://api.shodan.io/shodan/host/${ip}?key=${SHODAN_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Shodan APIエラー", details: error.message });
    }
});

// 👑 frontend（home.html）を提供
app.get("/frontend", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/public/home.html"));
});

// 👑 Reactアプリ（/app）を提供（frontend）
app.use("/frontend/app", express.static(path.join(__dirname, "../frontend/build")));

// 👑 任意のルートが一致しない場合はReactアプリのindex.htmlを提供（frontend）
app.get("/frontend/app/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// 👑 サーバー起動 (frontend)
app.listen(PORT0, () => {
    console.log(`✅ frontend server running on http://localhost:${PORT0}/frontend`);
});


// 🎁 webapp（home.html）を提供
app.get("/webapp", (req, res) => {
    res.sendFile(path.join(__dirname, "../webapp/public/home.html"));
});

// 🎁 Reactアプリ（/app）を提供（webapp）
app.use("/webapp/app", express.static(path.join(__dirname, "../webapp/build")));

// 🎁 任意のルートが一致しない場合はReactアプリのindex.htmlを提供（webapp）
app.get("/webapp/app/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../webapp/build/index.html"));
});

// 🎁 サーバー起動 (webapp)
app.listen(PORT1, () => {
    console.log(`✅ webapp server running on http://localhost:${PORT1}/webapp`);
});
