import User from "../models/user.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

//Register
export const register = async (req,res) => {
    const {name, email, password} = req.body;

    try {
        if(!name || !email || !password){
            return res.status(400).json({message: "Tüm alanları doldurunuz!"});
        }
        if( password.length < 6 || password.length > 20){
            return res.status(400).json({message: "Şifre 6-20 karakter uzunluğunda olmalıdır!"})        
        }

        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message: "Bu email kullanılmaktadır!"})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        
        const newUser = await User.create({
            name,
            email, 
            password: hashedPassword
        });


        const token = jwt.sign(
            {userId: newUser._id, role: newUser.role},
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

//Login
export const login = async (req,res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message:"Kullanıcı bulanamadı!"})

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) return res.status(401).json({message:"Geçersiz Şifre!"})
        
        const token = jwt.sign(
            {userId: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "365d"}
        );

        const {password: _, ...userData} = user.toObject();

        res.status(200).json({
            message: "Giriş Başarılı",
            token,
            user: userData
        });
    }catch(error){
        console.error("Login hatası:",error.message);
        res.status(500).json({message: "Sunucu Hatası", error:error.message})
    }
};

