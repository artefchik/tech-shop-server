import {Favorite} from "./favorite.model";

export class FavoriteDto {
    id

   userId



    constructor(data: Favorite) {
        this.id = data._id;
        this.userId = data.userId;

    }
}
