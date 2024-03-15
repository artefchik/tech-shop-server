import { model, Schema, Types } from 'mongoose';

export interface Favorite {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
}

const FavoriteSchema = new Schema<Favorite>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

export const FavoriteModel = model('Favorite', FavoriteSchema);
