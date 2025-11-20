const express = require("express");
const router = express.Router();
const User = require("../models/userModel") 

router.post("/register", async (req,res,next) => {
    try {
        const {name, email, password} = req.body;

        const newUser = await User.create({name, email, password});

        const token = jwt.sign();
        
    
    });


/* Request body’den name, email, password alacağım.
Önce email DB’de var mı diye kontrol edeceğim.
Varsa hata döneceğim.
Yoksa yeni kullanıcı oluşturacağım.
Mongoose save ile kaydedeceğim.
user._doc içindeki password’ü kaldıracağım.
JWT üreteceğim.
Response: { user, token } döneceğim. */

