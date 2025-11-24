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

//Login
export const login = async (req,res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message:"Kullanıcı bulanamadı!"})

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) return res.status(401).json({message:"Şifre hatalı!"})
        
            
    }
};



/* Kullanıcı email + password gönderir✅
Backend email’e göre kullanıcıyı bulur✅
Kullanıcı yoksa → “Email veya şifre hatalı” dön✅
Kullanıcı varsa bcrypt.compare ile şifreyi kontrol et
Şifre yanlışsa → yine aynı hata
Şifre doğruysa:
JWT token oluştur
Şifresiz user objesi oluştur
{ user, token } döndür
Bu akışı defterine mutlaka yaz. */