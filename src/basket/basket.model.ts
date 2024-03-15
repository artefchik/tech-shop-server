import { model, Schema, Types } from 'mongoose';

export interface Basket {
    _id:Types.ObjectId;
    userId: Types.ObjectId;
}

const BasketSchema = new Schema<Basket>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

export const BasketModel = model('Basket', BasketSchema);
