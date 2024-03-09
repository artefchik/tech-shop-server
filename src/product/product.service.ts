import {ProductDto} from './product.dto';

import {ProductModel} from './product.model';
import {Product} from './product.interface';
import {QueryParamsType} from '../types/request';
import ApiError from "../exceptions/ApiError";
import {SortOrder} from "mongoose";

interface CategoryFilter {
    [key: string]: string;
}

interface QuerySort {
    [key: string]: SortOrder;
}

class ProductsService {
    getProductDto(product: Product) {
        return new ProductDto(product);
    }

    async getAll(query: QueryParamsType) {
        const {category} = query;
        console.log(query)
        let products;
        const limit = query.limit ?? 3;
        const page = query.page ?? 1;
        const order = query.order ?? 'asc';
        const sort = query.sort ?? 'price.current';
        let categoryFilter: CategoryFilter = {}
        if (category) {
            categoryFilter.category = category
        }
        let querySort: QuerySort = {};
        if (query.sort) {
            querySort['price.current']= order;
        }
        products = await ProductModel.find(categoryFilter)
            .sort(querySort)
            .skip(page * limit - limit)
            .limit(limit)

        return products.map((product) => this.getProductDto(product));
    }

    async getOne(id: string) {
        console.log(id)
        const product = await ProductModel.findById<Product>(id);
        if (!product) {
            throw ApiError.badRequest('Product not found')
        }
        return this.getProductDto(product)
    }
}

export default new ProductsService();
