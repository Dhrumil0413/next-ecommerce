import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    imagesLinks: [{type: String}]
});

export const Product = models?.Product || model('Product', ProductSchema);      