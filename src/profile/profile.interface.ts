import { Types } from 'mongoose';

export interface Profile {
    _id: Types.ObjectId;
    firstname: string;
    lastname: string;
    age: number;
}
