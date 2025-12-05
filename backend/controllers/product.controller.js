import Product from "../models/product.js";

//Tüm ürünleri getir
export const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({count: products.length, data:products});
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Ürünler listelenirken sunucu hatası oluştu." });
    }    
};

//Tek ürün detayı
export const getProductById = async (req,res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"Ürün bulunamadı"});
        };
        res.status(200).json({ data: product });
    }
    catch (error) {
        res.status(500).json({message: "Ürün detayı getirilirken hata oluştu." });
    }
};

//Admin ürün ekleme
export const postAddProduct = async (req, res) => {
    try{
        const product = await Product.create({
            ...req.body,
            user: req.user._id
        });
        res.status(201).json({message:"Ürün başarıyla eklendi", data:product})
    }
    catch (error) {
        res.status(400).json({message: "Ürün ekleme başarısız.", error: error.message });
    }
};






/* 
POST /api/products → Yeni ürün ekleme (admin)
PUT /api/products/:id → Ürün güncelleme (admin)
DELETE /api/products/:id → Ürün silme (admin)
 */