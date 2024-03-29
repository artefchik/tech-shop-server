import { model, Schema, Types } from 'mongoose';

export interface BasketProduct extends Document{
    _id:Types.ObjectId;
    basketId: Types.ObjectId;
    productId: Types.ObjectId;
    count: number;
}

const BasketProductSchema = new Schema<BasketProduct>({
    basketId: {
        type: Schema.Types.ObjectId,
        ref: 'Basket',
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    count: {
        type: Number,
        default: 1,
    },
});

export const BasketProductModel = model('BasketProduct', BasketProductSchema);
