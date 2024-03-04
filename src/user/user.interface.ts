import { Types } from 'mongoose';

export interface User {
    _id: Types.ObjectId;
    email: string;
    username: string;
    password: string;
    isActivatedEmail: boolean;
    activatedLinkEmail: string;
    avatar: string;
    roles: Types.Array<string>;
}
