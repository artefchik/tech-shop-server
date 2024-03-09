import { model, Schema, Types } from 'mongoose';

interface Favorite {
    userId: Types.ObjectId;
}

const FavoriteSchema = new Schema<Favorite>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

export const FavoriteModel = model('Favorite', FavoriteSchema);
