import {ObjectId} from 'mongodb';
import {Basket, BasketModel} from './basket.model';
import {BasketProduct, BasketProductModel} from './basketProduct.model';
import {BasketProductDto} from "./basketProduct.dto";
import ProductService from "../product/product.service";
import ApiError from "../exceptions/ApiError";
import {BasketDto} from "./basket.dto";

class BasketService {

    getBasketProductDto(basketProduct: BasketProduct) {
        return new BasketProductDto(basketProduct)
    }


    async getBasket(userId: string) {
        const basket = await BasketModel.findOne<Basket>({
            userId: new ObjectId(userId),
        });
        if (!basket) {
            throw ApiError.badRequest('not found')
        }
        return new BasketDto(basket)
    }

    async createBasket(id: ObjectId) {
        const basket = await BasketModel.create({
            userId: new ObjectId(id),
        });
        return basket;
    }

    async addProduct(basketId: string, productId: string) {
        const productInDb = await BasketProductModel.findOne({
            $and: [{basketId}, {productId}],
        });

        if (productInDb) {
            productInDb.count += 1;
            await productInDb.save();
            return this.getBasketProductDto(productInDb);
        } else {
            const product = await BasketProductModel.create({
                basketId,
                productId,
            });
            return this.getBasketProductDto(product);
        }
    }

    async deleteProduct(basketId: string, productId: string) {

        const product = await BasketProductModel.findOneAndDelete({$and: [{basketId: basketId}, {productId}]});
        return product;
    }

    async deleteAllProduct(basketId: string) {
        const products = await BasketProductModel.deleteMany({basketId});
        return products;

    }


    async updateCountProduct(basketId: string, productId: string, count: number) {
        const updatedProduct = await BasketProductModel.findOneAndUpdate(
            {$and: [{basketId}, {productId}]},
            {$set: {count: count}},
            {new: true},
        );
        if (!updatedProduct) {
            throw ApiError.badRequest('Count don\'t updated')
        }
        if (count === 0) {
            const product = await BasketProductModel.findByIdAndDelete(productId);
            return product;
        }
        return updatedProduct;
    }

    async getProducts(id: string) {
        const basketProducts = await BasketProductModel.find<BasketProduct>({basketId: id});


        async function processProducts() {
            const products = [];

            for (const basketProduct of basketProducts) {
                try {
                    const product = await ProductService.getOne(String(basketProduct.productId));
                    const count = basketProduct.count
                    products.push({...product, count});
                } catch (error) {
                    console.log(error);
                }
            }

            return products;
        }

        return processProducts();
    }

}

export default new BasketService();
