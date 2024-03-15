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
        const {category, color,brand,model} = query;
        console.log(query)
        let products;
        const limit = query.limit ?? 3;
        const page = query.page ?? 1;
        const order = query.order ?? 'asc';
        const sort = 'price.current';
        let categoryFilter: CategoryFilter = {}
        if (category) {
            categoryFilter.category = category
        }
        if (color) {
            categoryFilter.color = color
        }
        if (brand){
            categoryFilter.brand = brand
        }
        if (model){
            categoryFilter.title = model
        }

        let querySort: QuerySort = {};
        if (order) {
            querySort["price.current"] = order;
        }
        // const conditions = Object.keys(categoryFilter).map(key => ({
        //     [key]: { $in: [categoryFilter[key]] }
        // }));
        console.log(categoryFilter, querySort)
        products = await ProductModel.find<Product>(categoryFilter)
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
