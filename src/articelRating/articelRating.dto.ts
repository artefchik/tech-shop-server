import {ArticleRating} from "./articelRating.interface";

export class ArticleRatingDto {
    articleId;

    feedback;

    rate

    userId

    id;

    constructor(data: ArticleRating) {
        this.id = data._id;
        this.articleId = data.articleId;
        this.feedback = data.feedback;
        this.rate = data.rate;
        this.userId = data.userId;
    }
}

