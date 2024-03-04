import { Schema, model } from 'mongoose';
import { Article } from './article.interface';

const ArticleSchema = new Schema<Article>({
    title: { type: String, required: true },
    img: { type: String, required: true },
    views: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    isUpdate: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    types: [String],
    blocks: [
        {
            type: { type: String, required: true },
            title: { type: String },
            paragraph: { type: String },
            src: { type: String },
        },
    ],
});

export const ArticleModel = model('Article', ArticleSchema);
