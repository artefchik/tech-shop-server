import { Types, Document } from 'mongoose';

export interface Token extends Document {
    userId: Types.ObjectId;
    refreshToken: string;
}
