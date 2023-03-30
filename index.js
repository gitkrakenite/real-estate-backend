const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");

const PORT = process.env.PORT || 8000;

// local imports
const connectDB = require("./config/db");
const propertyRouter = require("./routes/propertyRoute");
const userRouter = require("./routes/userRoute");

// middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// DB connect
connectDB();

// routes
app.get("/", (req, res) => res.send("AP1 working"));

app.use("/api/v1/property", propertyRouter);
app.use("/api/v1/user", userRouter);

// listener
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
