import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

//Register
export const register = async (req,res) => {
    const {name, email, password} = req.body;

    try {

        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message: "Bu email kullanılmaktadır!"})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        
        const newUser = await User.create({name, email, password: hashedPassword});


        const token = jwt.sign(
            {userId: newUser._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );

        res.status(201).json({
            message: "Kayıt başarılı",
            token,
            user: {
                id: newUser._id,
                name : newUser.name,
                email: newUser.email
            }
        });
    }catch(error){
        console.error("Register hatası:", error.message)
        res.status(500).json({message: "Kullanıcı oluşturulurken hata oluştu", error:error.message})
    }
};
