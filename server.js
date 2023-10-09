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
const PORT = process.env.PORT || 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Set mongoose options to avoid deprecation warnings
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// Connect to the database
Connection(username, password);

DefaultData();
// Serve static files
app.use(express.static(path.join(__dirname, "./client/build")));

// Parse request bodies
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Define API routes
app.use("/", Routes);

// Handle all other routes by serving the React app
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);
