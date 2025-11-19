const mongoose = require("mongoose");

const connectDB = async () => {
  try{
   await mongoose.connect(process.env.MONGO_URI);
   console.log("Database connected succesfully ✅");
  }
  catch (err) {
    console.log("database not connected! ❌");
    console.log(err.message);
  }
}

module.exports = connectDB;