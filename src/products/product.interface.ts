import { Types } from 'mongoose';
interface ProductPrice {
    current: number;
    previous: number;
}

export interface Product {
    _id: Types.ObjectId;
    title: string;
    category: string;
    color: string;
    imageSrc: string;
    memory: string;
    price: ProductPrice;
}
