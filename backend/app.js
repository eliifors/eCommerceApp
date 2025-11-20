require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");
const connectDB = require("./config/database");
const  authRoutes = require("./routes/auth.route")

const bcrypt = require("bcrypt")


const app = express();
connectDB();

app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8000;
app.listen (PORT,()=>{
    console.log("Server is running on ", PORT);
})

