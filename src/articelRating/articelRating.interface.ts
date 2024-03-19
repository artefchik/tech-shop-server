import {Types} from 'mongoose';

export interface ArticleRating {
    _id: { type: Types.ObjectId },
    articleId: { type: Types.ObjectId },
    userId: { type: Types.ObjectId },
    feedback: { type: String },
    rate: { type: Number },
}

export interface RatingArg {
    id:string
    articleId: string,
    userId: string,
    feedback?: string,
    rate: number,
}
