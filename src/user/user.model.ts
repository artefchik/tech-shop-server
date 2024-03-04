import { model, Schema, Types } from 'mongoose';
import { User } from './user.interface';

const UserSchema = new Schema<User>({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivatedEmail: { type: Boolean, default: false },
    activatedLinkEmail: { type: String },
    avatar: { type: String, default: '' },
    roles: {
        type: [String],
        default: 'user',
    },
});

export const UserModel = model('User', UserSchema);
