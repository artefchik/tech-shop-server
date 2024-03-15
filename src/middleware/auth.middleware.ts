import ApiError from '../exceptions/ApiError';
import TokenService from '../token/token.service';
import {NextFunction, Request, Response} from 'express';

export function authMiddleware (req:Request, res:Response, next:NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.unauthorized());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.unauthorized());
        }
        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.unauthorized());
        }
        // req.body = userData;
        next();
    } catch (e) {
        return next(ApiError.unauthorized());
    }
};
