import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.route.js"

import bcrypt from "bcrypt"

dotenv.config();
const app = express();
connectDB();

app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 3000;
app.listen (PORT,()=>{
    console.log(`Server ${PORT} portunda çalışıyor`);
});

