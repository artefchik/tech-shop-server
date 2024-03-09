import {FavoriteItem} from "./favoriteItem.model";

export class FavoriteItemDto {
    id

    favoriteId

    productId



    constructor(data: FavoriteItem) {
        this.id = data._id;
        this.favoriteId = data.favoriteId;
        this.productId = data.productId;
    }
}
