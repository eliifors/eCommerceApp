
require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const connectDB = require("./config/database");
connectDB();

const bcrypt = require("bcrypt")

const PORT = process.env.PORT || 8000;
app.listen (PORT,()=>{
    console.log("Server is running on ", PORT);
})

