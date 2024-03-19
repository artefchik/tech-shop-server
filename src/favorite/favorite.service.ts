import {ObjectId} from 'mongodb';
import {Favorite, FavoriteModel} from './favorite.model';
import {FavoriteItem, FavoriteItemModel} from './favoriteItem.model';
import {FavoriteItemDto} from "./favoriteItem.dto";
import {FavoriteDto} from "./favorite.dto";
import ApiError from "../exceptions/ApiError";
import ProductService from "../product/product.service";

class FavoriteService {

    getProductDto(favorite: FavoriteItem) {
        return new FavoriteItemDto(favorite);
    }

    async getFavoriteStorage(userId: string) {
        const favoriteStorage = await FavoriteModel.findOne<Favorite>(
            {userId: new ObjectId(userId)}
        );
        if (!favoriteStorage) {
            throw ApiError.badRequest('Not found')
        }
        return new FavoriteDto(favoriteStorage)
    }

    async createFavoriteStorage(id: ObjectId) {
        const favoriteStorage = await FavoriteModel.create({
            userId: new ObjectId(id),
        });
        return favoriteStorage;
    }

    async toggleFavorite(favoriteId: string, productId: string) {
        const productInDb = await FavoriteItemModel.findOne({
            $and: [{favoriteId}, {productId}],
        });

        if (productInDb) {
            return productInDb.deleteOne()
        } else {
            const favoriteItem = await FavoriteItemModel.create({
                favoriteId,
                productId,
            });
            return favoriteItem;
        }
    }

    async getFavorites(favoriteId: string) {
        const favoritesItems = await FavoriteItemModel.find<FavoriteItem>({favoriteId});
        const favoritesItemsDto = favoritesItems.map(favorite => this.getProductDto(favorite))
        return favoritesItemsDto
    }

    async getFavoritesWithProducts(favoriteId:string){
        const favoritesItems = await FavoriteItemModel.find<FavoriteItem>({favoriteId});
        async function processProducts() {
            const products = [];

            for (const favoritesItem of favoritesItems) {
                try {
                    const product = await ProductService.getOne(String(favoritesItem.productId));
                    products.push({...product, favoritesItem});
                } catch (error) {
                    console.log(error);
                }
            }

            return products;
        }

        return processProducts();
    }
}

export default new FavoriteService();
