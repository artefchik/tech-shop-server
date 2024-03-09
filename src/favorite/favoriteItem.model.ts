import { model, Schema, Types } from 'mongoose';

export interface FavoriteItem extends Document{
    _id:Types.ObjectId;
    favoriteId: Types.ObjectId;
    productId: Types.ObjectId;
}

const FavoriteItemSchema = new Schema<FavoriteItem>({
    favoriteId: {
        type: Schema.Types.ObjectId,
        ref: 'Favorite',
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
});

export const FavoriteItemModel = model('FavoriteItem', FavoriteItemSchema);
