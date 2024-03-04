import ApiError from '../exceptions/ApiError';
import {NextFunction, Request, Response} from 'express';
import HttpException from "../exceptions/HttpException";

export default function (err: Error, req: Request, res: Response) {
    if (err instanceof ApiError) {
        return res.status(err.status)
            .send({message: err.message});
    }
    return res.status(500).send({message: 'ERROR SERVER'});
};

