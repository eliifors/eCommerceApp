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

//Admin ürün güncelleme
export const updateProduct = async (req, res) => {

    const productId = req.params.id;

    try{
        const product = await Product.findByIdAndUpdate(
            productId,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if(!product){
            return res.status(404).json({message:"Güncellenecek ürün bulunamadı"});
        }
        res.status(201).json({message:"Ürün başarıyla güncellendi", data:product})
    }
    catch (error) {
        res.status(400).json({message: "Ürün güncelleme başarısız.", error: error.message });
    }
;}

//Admin ürün silme
export const deleteProuct = async (req, res) => {

    const productId = req.params.id;

    try{
        const product = await Product.findByIdAndDelete(productId);

         if(!product){
            return res.status(404).json({message:"Silenecek ürün bulunamadı"});
        }
        res.status(201).json({message:"Ürün başarıyla silindi", data:product})
    }
    catch (error) {
        res.status(400).json({message: "Ürün silinirken sunucu hatası oluştu.", error: error.message });
    }
} 


export const getProducts = async (req, res) => {
    try {
        let filter = {};

        if (req.query.keyword) {
            const keyword = req.query.keyword;
            filter.$or = [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ];
        }

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};
            if (req.query.minPrice) {
                filter.price.$gte = Number(req.query.minPrice);
            }
            if (req.query.maxPrice) {
                filter.price.$lte = Number(req.query.maxPrice);
            }
        }
        
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        const priceQuery = JSON.parse(queryStr).price;
        if (priceQuery) {
            filter.price = { ...filter.price, ...priceQuery };
        }

        // Sayfalandırma
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalProducts = await Product.countDocuments(filter);
        const products = await Product.find(filter)
                                      .skip(skip)
                                      .limit(limit);

        res.status(200).json({ 
            success: true, 
            totalProducts, 
            totalPages: Math.ceil(totalProducts / limit), 
            currentPage: page, 
            data: products 
        });

    } catch (error) {
        console.error("Ürün listeleme ve filtreleme hatası:", error);
        res.status(500).json({ 
            success: false, 
            message: "Ürünler listelenirken veya filtrelenirken sunucu hatası oluştu.",
            error: error.message
        });
    }
};