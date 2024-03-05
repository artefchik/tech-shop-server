import {Schema, model} from 'mongoose';
import {ArticleComment} from "./articleComment.interface";

const ArticleCommentsSchema = new Schema<ArticleComment>({
    articleId: { type: Schema.Types.ObjectId, ref: 'Article' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
});

export default model('ArticleComment', ArticleCommentsSchema);
