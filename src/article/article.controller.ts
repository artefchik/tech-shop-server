import ArticleService from './article.service';
import {QueryParamsType, RequestWithParams, RequestWithQuery} from '../types/request';
import {NextFunction} from 'express';
import ApiError from "../exceptions/ApiError";

class ArticleController {
    async getAll(
        req: RequestWithQuery<QueryParamsType>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            // @ts-ignore
            const query = req.query
            const articles = await ArticleService.getAll(query);
            if (!articles) {
                return next(ApiError.badRequest('Incorrect data'));
            }
            // @ts-ignore
            return res.json(articles);
        } catch (e) {
            next(e)
        }
    }

    async getById(
        req: RequestWithParams<{ id: string }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const {id} = req.params;
            if (!id) {
                return next(ApiError.badRequest('Incorrect data'));
            }
            const article = await ArticleService.getById(id);
            // @ts-ignore
            return res.json(article);
        } catch (e) {
            next(e)
        }
    }
}

export default new ArticleController();
