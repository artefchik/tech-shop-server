import { model, Schema } from 'mongoose';
import { Product } from './product.interface';

const ProductSchema = new Schema<Product>({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        required: true,
    },
    memory: { type: String },
    price: {
        current: { type: Number },
        previous: { type: Number },
    },
});

export const ProductModel = model('Product', ProductSchema);
