import jwt from "jsonwebtoken";
import User from  "../models/userModel.js";

export const requireAuth = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return res.status(401).json({ message: "Erişim reddedildi. Geçerli bir token bulunamadı!"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

       if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "Bu token'a ait kullanıcı artık mevcut değil." 
            });
        }

        req.user = user;
        next();

    }catch (error) {
        return res.status(401).json({ message: "Token geçersiz veya süresi dolmuş." });
    }
};

export const requireAdmin = async (req, res, next) => {

    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Bu işlemi yapmaya yetkiniz yok. Sadece admin erişebilir." });
    }
}
