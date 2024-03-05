import {ArticleComment} from "./articleComment.interface";

export class ArticleCommentDto {
    articleId;

    text;

    id;

    constructor(data:ArticleComment) {
        this.id = data._id;
        this.articleId = data.articleId;
        this.text = data.text;
    }
}

