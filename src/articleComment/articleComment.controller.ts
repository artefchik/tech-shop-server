import ApiError from '../exceptions/ApiError';
import ArticleCommentsService from './articleComment.service';
import {RequestWithParams, RequestWithParamsAndBody} from "../types/request";
import {NextFunction, Response} from 'express';
import {CommentArg} from "./articleComment.interface";

class ArticleCommentsController {
    async getById(req: RequestWithParams<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            if (!id) {
                return next(ApiError.badRequest('Incorrect data'));
            }
            const comments = await ArticleCommentsService.getById(id);
            return res.json(comments);
        } catch (e) {
           next(e)
        }
    }

    async createComment(req:RequestWithParamsAndBody<{ id:string }, CommentArg>, res:Response, next:NextFunction) {
        try {
            const {id} = req.params;
            if (!id) {
                return next(ApiError.badRequest('Incorrect data'));
            }
            const comments = await ArticleCommentsService.createComment(req.body);
            return res.json(comments);
        } catch (e) {
            next(e);
        }
    }

    async deleteComment(req: RequestWithParams<{ id: string }>, res:Response, next:NextFunction) {
        try {
            const {id} = req.params;
            if (!id) {
                return next(ApiError.badRequest('Incorrect data'));
            }
            const deleteComment = await ArticleCommentsService.deleteComment(id);
            res.json(deleteComment);
        } catch (e) {
            next(e);

        }
    }

    async updateComment(req:RequestWithParamsAndBody<{ id:string }, CommentArg>, res:Response, next:NextFunction) {
        try {
            const {id} = req.params;
            if (!id) {
                return next(ApiError.badRequest('Incorrect data'));
            }
            const updatedComments = await ArticleCommentsService.updateComment(req.body);
            res.json(updatedComments);
        } catch (e) {
            next(e);

        }
    }
}

export default new ArticleCommentsController();
