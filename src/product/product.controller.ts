import ProductsService from './product.service';
import { NextFunction, Response } from 'express';
import { Product } from './product.interface';
import { QueryParamsType, RequestWithParams, RequestWithQuery } from '../types/request';
import {BadRequest} from "../exceptions/BadRequest";
import ApiError from "../exceptions/ApiError";


class ProductsController {
    async getAll(
        req: RequestWithQuery<QueryParamsType>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { query } = req;
            const products = await ProductsService.getAll(query);
            return res.json(products);
        } catch (e) {
            console.log(e);
        }
    }

    async getOne(
        req: RequestWithParams<{ id: string }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest('ошибка валидации'));
            }
            const product = await ProductsService.getOne(id);
            return res.json(product);
        } catch (e) {
            console.log(e)
        }
    }
}

export default new ProductsController();
