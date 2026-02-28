require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env["SERVER_PORT"];
const baseRoute = require("./baseRoute.js");
const mongoose = require("mongoose");
const a = { "start": "node --env-file=.env.local server.js"};
const url = process.env["DATABASE_URL"];

mongoose.connect(url).then(() => {
    console.log("Database connected sucessfully");
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use("/static", express.static("public"));

app.use("/base", baseRoute);

app.get("/", (req, res) => res.send("Hello world!"));

app.listen(port, () => console.log("App listeting on http://localhost:" + port));