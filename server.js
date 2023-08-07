import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import Connection from "./database/db.js";
import Routes from "./routes/route.js";
import DefaultData from "./default.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Set up Express middleware
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to the database
Connection(username, password);

// Set up API routes
app.use("/", Routes);

// Serve React app
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Load default data (if needed)
DefaultData();

// Start the server
app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);
