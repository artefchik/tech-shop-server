import {ObjectId} from 'mongodb';
import {BasketModel} from './basket.model';
import {BasketProduct, BasketProductModel} from './basketProduct.model';
import {ProductModel} from '../product/product.model';

class BasketService {
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
            return product;
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
                    const prod = await ProductModel.findById(basketProduct.productId);

                    products.push({prod, basketProduct});
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
