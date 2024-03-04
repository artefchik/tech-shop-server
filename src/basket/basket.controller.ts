import BasketService from './basket.service';
import { RequestWithParams, RequestWithParamsAndBody } from '../types/request';
import { NextFunction, Response } from 'express';
import { BadRequest } from '../exceptions/BadRequest';

class BasketController {
    async addProduct(
        req: RequestWithParamsAndBody<{ id: string }, { productId: string }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id: basketId } = req.params;
            const { productId } = req.body;
            if (!basketId || !productId) {
                return next(new BadRequest());
            }
            const addedProduct = await BasketService.addProduct(basketId, productId);
            res.json(addedProduct);
        } catch (e) {
            return next(new BadRequest());
        }
    }

    async deleteProduct(
        req: RequestWithParams<{ id: string }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(new BadRequest());
            }
            const deletedProduct = await BasketService.deleteProduct(id);
            res.json(deletedProduct);
        } catch (e) {
            return next(new BadRequest());
        }
    }

    async updateProduct(
        req: RequestWithParamsAndBody<{ id: string }, { count: number }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const { count } = req.body;
            if (!id || !count) {
                return next(new BadRequest());
            }
            const updatedProduct = await BasketService.updateCountProduct(id, count);
            res.json(updatedProduct);
        } catch (e) {
            return next(new BadRequest());
        }
    }

    async getProducts(
        req: RequestWithParamsAndBody<{ id: string }, {}>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(new BadRequest());
            }
            const products = await BasketService.getProducts(id);
            res.json(products);
        } catch (e) {
            return next(new BadRequest());
        }
    }
}

export default new BasketController();
