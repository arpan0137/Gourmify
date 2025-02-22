import { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
    name: { type: String, unique: true, required: true },
}, { timestamps: true })

export const Category = models?.categories || model('categories', CategorySchema)