import {Types} from 'mongoose';

export interface ArticleComment {
    _id: { type: Types.ObjectId },
    articleId: { type: Types.ObjectId },
    userId: { type: Types.ObjectId },
    text: { type: String },
}

export interface CommentArg {
    id:string
    articleId: string,
    userId: string,
    text: string,
}
