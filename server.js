//this file recieves the app.js file and starts the server
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 FORCE dotenv to load backend/.env
dotenv.config({
  path: path.resolve(__dirname, ".env"),
});


import app from "./src/app.js";
import mongoose from "mongoose";


const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });

    })
    .catch(err => {
        console.error("DB connection failed", err);
        process.exit(1);
    })