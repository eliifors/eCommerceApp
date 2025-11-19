const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type: String,
        required: [true, "Please your enter name!"],
        maxLenght:[20, "Name cannot exceed 20 characters!"],
        minLenght: [4, "Name should have mor than 4 characters!"],
    },
    email:{
        type: String,
        required: [true, "Please your enter email!"],
        unique: true,
        trim:true,
    },
    password:{
        type: String,
        required: [true, "Please your enter passwor!"],
        minLenght: [6, "Password should be greater than 6 characters!"]
    },
    role:{
        type: String,
        enum: ["user","admin"],
        default: "user"
    },
    userImage:{
        type: String,
        default: "user.png"
    },
},
{timestamps : true}
);

const userModel = mongoose.model("users", userSchema)
module.exports = userModel;
