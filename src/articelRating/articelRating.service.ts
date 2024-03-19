import {ObjectId} from 'mongodb';
import ArticleRatingModel from './articelRating.model';
import ApiError from '../exceptions/ApiError';
import UserService from '../user/user.service';
import {ArticleRatingDto} from "./articelRating.dto";
import {ArticleRating, RatingArg} from "./articelRating.interface";
import ArticleService from "../article/article.service";




class ArticleRatingService {
    async getById(articleId:string,userId:string) {
        const rating = await ArticleRatingModel.findOne<ArticleRating>({
            articleId: new ObjectId(articleId),
            // userId: new ObjectId(userId),
        });
        console.log(articleId,userId)
        if (!rating) {
            return {}
        }
        return new ArticleRatingDto(rating)
    }

    async createRating(ratingData:RatingArg) {
        const {articleId, userId,feedback,rate } = ratingData;

        const ratingInDb = await ArticleRatingModel.findOne<ArticleRating>({
            articleId: new ObjectId(articleId),
            userId: new ObjectId(userId),
        });
        if (ratingInDb){
            throw ApiError.badRequest('The rating is already there');

        }

        const newRate = await ArticleRatingModel.create({
            articleId: new ObjectId(articleId),
            userId: new ObjectId(userId),
            rate,
            feedback
        });
        // const user = await UserService.getOne(new ObjectId(userId));
        const rating = new ArticleRatingDto(newRate);

        return rating
    }

    // async updateComment(commentData:CommentArg) {
    //     const {articleId, userId, text, id} = commentData;
    //     if (!articleId || !userId || !text) {
    //         throw ApiError.badRequest('Incorrect data');
    //     }
    //     const updatedComment = await ArticleCommentsModel.updateOne(
    //         {
    //             _id: new ObjectId(id),
    //         },
    //         {$set: {text}},
    //     );
    //     return updatedComment;
    // }

    // async deleteComment(id:string) {
    //     const deleteComment = await ArticleCommentsModel.findByIdAndDelete(id);
    //     return deleteComment;
    // }
}

export default new ArticleRatingService();
