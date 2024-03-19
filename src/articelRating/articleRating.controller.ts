import ApiError from '../exceptions/ApiError';
import {RequestWithParamsAndBody} from "../types/request";
import {NextFunction, Response} from 'express';
import ArticleRatingService from "./articelRating.service";
import {RatingArg} from "./articelRating.interface";
import {User} from "../user/user.interface";

class ArticleRatingController {
    async getById(req: RequestWithParamsAndBody<{ articleId: string }, {
        user: User
    }>, res: Response, next: NextFunction) {
        try {
            const {articleId} = req.params;
            if (!articleId) {
                return next(ApiError.badRequest('Incorrect data'));
            }

            const userId = String(req.body.user._id)
            const comment = await ArticleRatingService.getById(articleId, userId);
            return res.json(comment);
        } catch (e) {
            next(e)
        }
    }

    async createRating(req: RequestWithParamsAndBody<{ id: string }, RatingArg
    >, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            console.log('body', req.body)
            if (!id || !req.body) {
                return next(ApiError.badRequest('Incorrect data'));
            }

            const rating = await ArticleRatingService.createRating(req.body);
            return res.json(rating);
        } catch (e) {
            next(e);
        }
    }

    //
    // async deleteComment(req: RequestWithParams<{ id: string }>, res:Response, next:NextFunction) {
    //     try {
    //         const {id} = req.params;
    //         if (!id) {
    //             return next(ApiError.badRequest('Incorrect data'));
    //         }
    //         const deleteComment = await ArticleCommentsService.deleteComment(id);
    //         res.json(deleteComment);
    //     } catch (e) {
    //         next(e);
    //
    //     }
    // }
    //
    // async updateComment(req:RequestWithParamsAndBody<{ id:string }, CommentArg>, res:Response, next:NextFunction) {
    //     try {
    //         const {id} = req.params;
    //         if (!id) {
    //             return next(ApiError.badRequest('Incorrect data'));
    //         }
    //         const updatedComments = await ArticleCommentsService.updateComment(req.body);
    //         res.json(updatedComments);
    //     } catch (e) {
    //         next(e);
    //
    //     }
    // }
}

export default new ArticleRatingController();
