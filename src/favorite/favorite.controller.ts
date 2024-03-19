import FavoriteService from './favorite.service';
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from '../types/request';
import {NextFunction, Response} from 'express';
import ApiError from "../exceptions/ApiError";

class FavoriteController {


    async getFavoriteStorage(req: RequestWithParams<{ id: string }>,
                             res: Response,
                             next: NextFunction,) {
        try {

            const {id} = req.params
            if (!id) {
                return next(ApiError.badRequest('Not found'+id));
            }
            const favoriteStorage = await FavoriteService.getFavoriteStorage(id)
            res.json(favoriteStorage)
        } catch (e) {
            next(e)
        }
    }


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
        req: RequestWithParams<{ id: string }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const {id:favoriteId} = req.params;
            const products = await FavoriteService.getFavorites(favoriteId);
            res.json(products);
        } catch (e) {
            next(e);
        }
    }  async getFavoritesWithProducts(
        req: RequestWithParams<{ id: string }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const {id:favoriteId} = req.params;
            const products = await FavoriteService.getFavoritesWithProducts(favoriteId);
            res.json(products);
        } catch (e) {
            next(e);
        }
    }
}

export default new FavoriteController();
