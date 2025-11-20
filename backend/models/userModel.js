import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

export default mongoose.model("users", userSchema)
