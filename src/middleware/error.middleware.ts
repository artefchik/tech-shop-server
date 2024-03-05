import ApiError from '../exceptions/ApiError';
import {NextFunction, Request, Response} from 'express';
// @ts-ignore

export default function (error:ApiError, req: Request, res: Response, next: NextFunction) {
    if (error instanceof ApiError) {
        return res.status(error.status).json({message: error.message});
    }
    return res.status(500).json({message: 'ERROR SERVER'});
};

