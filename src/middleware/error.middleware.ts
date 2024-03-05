import ApiError from '../exceptions/ApiError';
import {NextFunction, Request, Response} from 'express';
import HttpException from "../exceptions/HttpException";
// @ts-ignore

export default function (error:ApiError, req: Request, res: Response, next: NextFunction) {
    if (error instanceof ApiError) {
        return res.status(error.status).json({message: error.message});
    }
    return res.status(500).json({message: 'ERROR SERVER'});
    // const status = error.status || 500;
    // const message = error.message || 'Something went wrong';
    // res.status(status).send({
    //     message,
    //     status,
    // });
};

