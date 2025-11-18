const mongoose = require("mongoose");

try{
    mongoose.connect("mongodb+srv://elifors:111121@cluster0.mpuy7t7.mongodb.net/?appName=Cluster0");
  console.log("Database connected succesfully ✅")
}
catch (err) {
    console.log("database not connected!")
}