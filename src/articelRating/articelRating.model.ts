import {Schema, model} from 'mongoose';
import {ArticleRating} from "./articelRating.interface";

const ArticleRatingSchema = new Schema<ArticleRating>({
    articleId: { type: Schema.Types.ObjectId, ref: 'Article' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    feedback: { type: String ,default: ''},
    rate: { type: Number },
});

export default model('ArticleRating', ArticleRatingSchema);
