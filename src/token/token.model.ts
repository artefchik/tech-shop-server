import { model, Schema, Types } from 'mongoose';
import { Token } from './token.interface';

const TokenSchema = new Schema<Token>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    refreshToken: {
        type: String,
        required: true,
    },
});

export const TokenModel = model('Token', TokenSchema);
