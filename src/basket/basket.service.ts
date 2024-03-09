import {ObjectId} from 'mongodb';
import {BasketModel} from './basket.model';
import {BasketProduct, BasketProductModel} from './basketProduct.model';
import {BasketProductDto} from "./basketProduct.dto";
import ProductService from "../product/product.service";

class BasketService {

    getBasketProductDto(basketProduct: BasketProduct) {
        return new BasketProductDto(basketProduct)
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
            return productInDb.save();
        } else {
            const product = await BasketProductModel.create({
                basketId,
                productId,
            });

            const basketProductDto = this.getBasketProductDto(product)
            return basketProductDto;
        }
    }

    async deleteProduct(id: string) {
        const product = await BasketProductModel.findByIdAndDelete(id);
        return product;
    }

    async updateCountProduct(productId: string, count: number) {
        const updatedProduct = await BasketProductModel.findByIdAndUpdate(
            productId,
            // @ts-ignore
            {$set: count},
            {new: true},
        );
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
