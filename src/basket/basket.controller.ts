import BasketService from './basket.service';
import {RequestWithParams, RequestWithParamsAndBody} from '../types/request';
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
        req: RequestWithParams<{ id: string }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const {id} = req.params;
            if (!id) {
                return next(ApiError.badRequest('Incorrect data'));
            }
            const deletedProduct = await BasketService.deleteProduct(id);
            res.json(deletedProduct);
        } catch (e) {
            next(e);
        }
    }

    async updateProduct(
        req: RequestWithParamsAndBody<{ id: string }, { count: number }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const {id} = req.params;
            const {count} = req.body;
            if (!id || !count) {
                return next(ApiError.badRequest('Incorrect data'));
            }
            const updatedProduct = await BasketService.updateCountProduct(id, count);
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
}

export default new BasketController();
