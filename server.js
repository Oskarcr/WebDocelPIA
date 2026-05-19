import { app } from "#DocelServer";
import { connect } from "mongoose";
import express from "express";
import fs from "fs";
import Path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);
const SERVER_PORT = process.env["SERVER_PORT"];
const DATABASE_URL = process.env["DATABASE_URL"];

const logtitle = (t = "") => console.log("////////\t" + t.toUpperCase() + "\t////////");
const endl = () => console.log("");

async function start() {
    // Crear la carpeta attachments/ si no la encuentra
    logtitle("ATTACHMENTS");
    try {
        const ATTACHMENTS_PATH = Path.join(".", "attachments");
        if(!fs.existsSync(ATTACHMENTS_PATH)) {
            console.log("The dir 'attachments/' not found");
            fs.mkdirSync(ATTACHMENTS_PATH);
            console.log("Dir 'attachments/' created");
        }
        else {
            console.log("Dir 'attachments/' already exists");
        }
    }
    catch(error) {
        console.error("File stream error");
        console.error(error);
        process.exit(0);
    }
    endl();

    // Intentar conectar a la base de datos
    logtitle("DATABASE");
    try {
        await connect(DATABASE_URL);
        console.log("Database connected sucessfully");
    }
    catch(error) {
        console.error("Database error");
        console.error(error);
        process.exit(0);
    }
    endl();

    // Colocar la app en un puerto local
    logtitle("LISTENING");

    app.use("/attachments", express.static(Path.join(__dirname, "attachments")));

    app.listen(SERVER_PORT, () => {
        console.log("App listeting on http://localhost:" + SERVER_PORT);
    });
}

start();