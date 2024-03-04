import ProductsService from './product.service';
import { NextFunction, Response } from 'express';
import { Product } from './product.interface';
import { QueryParamsType, RequestWithParams, RequestWithQuery } from '../types/request';
import {BadRequest} from "../exceptions/BadRequest";


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
                return next(new BadRequest());
            }
            const product = await ProductsService.getOne(id);
            return res.json(product);
        } catch (e) {
            return next(new BadRequest());
        }
    }
}

export default new ProductsController();
