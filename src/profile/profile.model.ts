import { model, Schema } from 'mongoose';
import { Profile } from './profile.interface';

const ProfileSchema = new Schema<Profile>({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    firstname: {
        type: String,
        default: '',
    },
    lastname: {
        type: String,
        default: '',
    },
    age: {
        type: Number,
        default: 0,
    },
});

export const ProfileModel = model('Profile', ProfileSchema);
