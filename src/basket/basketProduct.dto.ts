import {BasketProduct} from "./basketProduct.model";

export class BasketProductDto {
    id
    basketId
    productId
    count

    constructor(data: BasketProduct) {
        this.id = data._id;
        this.basketId = data.basketId;
        this.productId = data.productId;
        this.count = data.count;
    }
}
