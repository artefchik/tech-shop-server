import { Request } from 'express';
import { SortOrder } from 'mongoose';

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;
export type RequestWithParams<T> = Request<T>;
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>;

export interface QueryParamsType {
    category: string;
    limit: number;
    page: number;
    order: SortOrder;
    sort: string;
    types:string
}
