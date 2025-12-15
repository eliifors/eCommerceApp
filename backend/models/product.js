import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    price:{
        type: Number,
        required: true,
        min: 0
    },
    stock:{
        type: Number,
        required: true,
        default: 0
    },
    sold:{
        type: Number,
        default: 0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
/*         required: true */
    },
    description:{
        type: String,
        required: true,
        maxLength: 200
    },
    imageUrl:{
        type: String,
        required: true
    },
    rating: [
      {
        review: String,
        user: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "users" 
        },
        rating: {
            type: Number, 
            min: 1,
            max: 5
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
},
{timestamps: true}
);

export default mongoose.model("products", productSchema);