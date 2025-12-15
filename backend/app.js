import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.route.js"
import productsRoutes from "./routes/products.route.js";

import bcrypt from "bcrypt"
import product from "./models/product.js";

dotenv.config();
const app = express();
connectDB();

app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes)


const PORT = process.env.PORT || 3000;
app.listen (PORT,()=>{
    console.log(`Server ${PORT} portunda çalışıyor`);
});

