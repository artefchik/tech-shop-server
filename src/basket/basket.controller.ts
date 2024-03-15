import BasketService from './basket.service';
import {RequestWithParams, RequestWithParamsAndBody, RequestWithParamsAndQuery} from '../types/request';
import {NextFunction, Response} from 'express';
import ApiError from "../exceptions/ApiError";

class BasketController {
    async addProduct(
        req: RequestWithParamsAndBody<{ id: string }, { productId: string }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const {id: basketId} = req.params;
            const {productId} = req.body;
            if (!basketId || !productId) {
                return next(ApiError.badRequest('Failed to add'));
            }
            const addedProduct = await BasketService.addProduct(basketId, productId);
            res.json(addedProduct);
        } catch (e) {
            next(e);
        }
    }

    async deleteProduct(
        req: RequestWithParamsAndQuery<{ id: string }, { productId: string }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const {id} = req.params;
            const {productId} = req.query
            if (!id || !productId) {
                return next(ApiError.badRequest('Incorrect data'));
            }
            const deletedProduct = await BasketService.deleteProduct(id, productId);
            res.json(deletedProduct);
        } catch (e) {
            next(e);
        }
    }

    async deleteAllProduct(
        req: RequestWithParams<{ id: string }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const {id} = req.params;
            if (!id) {
                return next(ApiError.badRequest('Incorrect data'));
            }
            const deletedProduct = await BasketService.deleteAllProduct(id)
            res.json(deletedProduct);
        } catch (e) {
            next(e);
        }
    }

    async updateProduct(
        req: RequestWithParamsAndBody<{ id: string }, { productId: string, count: number }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const {id} = req.params;
            const {count, productId} = req.body;
            if (!id || !req.body) {
                return next(ApiError.badRequest('Incorrect data'));
            }
            const updatedProduct = await BasketService.updateCountProduct(id, productId, count);
            res.json(updatedProduct);
        } catch (e) {
            next(e);
        }
    }

    async getProducts(
        req: RequestWithParamsAndBody<{ id: string }, {}>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const {id} = req.params;
            const products = await BasketService.getProducts(id);
            res.json(products);
        } catch (e) {
            next(e);
        }
    }

    async getBasket(
        req: RequestWithParams<{ id: string }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const {id: userId} = req.params;
            const products = await BasketService.getBasket(userId);
            res.json(products);
        } catch (e) {
            next(e);
        }
    }


}

export default new BasketController();
