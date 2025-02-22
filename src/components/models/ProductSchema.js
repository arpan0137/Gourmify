import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
}, { timestamps: true })

export const Product = models?.products || model('products', ProductSchema)
