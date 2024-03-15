import {Basket} from "./basket.model";

export class BasketDto {
    id
    userId


    constructor(data: Basket) {
        this.id = data._id;
        this.userId = data.userId;

    }
}
