import {ObjectId} from 'mongodb';
import {FavoriteModel} from './favorite.model';
import {FavoriteItem, FavoriteItemModel} from './favoriteItem.model';
import {ProductModel} from '../product/product.model';
import {FavoriteItemDto} from "./favoriteItem.dto";

class FavoriteService {

    getProductDto(favorite: FavoriteItem) {
        return new FavoriteItemDto(favorite);
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
    async getFavorites(id: string) {
        const favoritesItems = await FavoriteItemModel.find<FavoriteItem>({favoriteId: id});
        const favoritesItemsDto = favoritesItems.map(favorite => this.getProductDto(favorite))
        return favoritesItemsDto
    }
}

export default new FavoriteService();
