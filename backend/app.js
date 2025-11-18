const express = require("express");
const app = express();

const mongoose = require("mongoose");
const connectDb = require("./config/database");

require("dotenv").config();

const PORT = process.env.PORT || 8000;
app.listen (PORT,()=>{
    console.log("Server is running on ", PORT);
})

