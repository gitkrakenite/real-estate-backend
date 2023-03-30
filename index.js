const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");

const PORT = process.env.PORT || 8000;

// local imports
const connectDB = require("./config/db");

// middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// DB connect
connectDB();

// routes
app.get("/", (req, res) => res.send("AP1 working"));

// listener
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
