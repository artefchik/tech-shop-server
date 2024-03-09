import FavoriteService from './favorite.service';
import {RequestWithParams, RequestWithParamsAndBody} from '../types/request';
import {NextFunction, Response} from 'express';
import ApiError from "../exceptions/ApiError";

class FavoriteController {
    async toggleFavorite(
        req: RequestWithParamsAndBody<{ id: string }, { productId: string }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const {id: favoriteId} = req.params;
            const {productId} = req.body;
            if (!favoriteId || !productId) {
                return next(ApiError.badRequest('Failed to add'));
            }
            const favorite = await FavoriteService.toggleFavorite(favoriteId, productId);
            res.json(favorite);
        } catch (e) {
            next(e);
        }
    }
    async getFavorites(
        req: RequestWithParamsAndBody<{ id: string }, {}>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const {id} = req.params;
            const products = await FavoriteService.getFavorites(id);
            res.json(products);
        } catch (e) {
            next(e);
        }
    }
}

export default new FavoriteController();
