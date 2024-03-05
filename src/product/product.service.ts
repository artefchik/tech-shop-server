import {ProductDto} from './product.dto';

import {ProductModel} from './product.model';
import {Product} from './product.interface';
import {QueryParamsType} from '../types/request';
import ApiError from "../exceptions/ApiError";

class ProductsService {
    getProductDto(product: Product) {
        return new ProductDto(product);
    }

    async getAll(query: QueryParamsType) {
        const {category} = query;
        let products;
        const limit = query.limit ?? 3;
        const page = query.page ?? 1;
        const order = query.order ?? 'asc';
        const sort = query.sort ?? 'price.current';
        if (category === 'all') {
            products = await ProductModel.find()
                .skip(page * limit - limit)
                .limit(limit)
                .sort({[sort]: order});
        } else {
            products = await ProductModel.find({category})
                .skip(page * limit - limit)
                .limit(limit)
                .sort({[sort]: order});
        }

        return products.map((product) => this.getProductDto(product));
    }

    async getOne(id: string) {
        const product = await ProductModel.findById<Product>(id);
        if (!product) {
            throw  ApiError.badRequest('Product not found')
        }
        return this.getProductDto(product)
    }
}

export default new ProductsService();
