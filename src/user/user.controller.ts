import {NextFunction, Request, Response} from 'express';
import UserService from './user.service';
import {RequestWithBody} from '../types/request';
import {User} from './user.interface';
import ApiError from "../exceptions/ApiError";
import {validationResult} from "express-validator";

interface UserRegistration {
    email: string;
    password: string;
    username: string;
}

interface UserLogin {
    email: string;
    password: string;
}

class UserController {
    async registration(
        req: RequestWithBody<UserRegistration>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('ошибка валидации'));
            }
            const {email, password, username} = req.body;
            const userData = await UserService.registration({
                email,
                password,
                username,
            });
            if (!userData) {
                return next(ApiError.badRequest('User not found'));
            }
            res.cookie('refreshToken', userData?.refreshToken, {
                maxAge: 20 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async login(req: RequestWithBody<UserLogin>, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.login(email, password);
            if (!userData){
                return next(ApiError.unauthorized());
            }
            res.cookie('refreshToken', userData?.refreshToken, {
                maxAge: 20 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.json(userData);

        } catch (e) {
            next(e)
        }
    }

    async logout(
        req: RequestWithBody<UserRegistration>,
        res: Response<User>,
        next: NextFunction,
    ) {
        try {
            const {refreshToken} = req.cookies;
            if (!refreshToken) {
                return next(ApiError.badRequest(''));
            }
            await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
        } catch (e) {
            next(e)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            if (!userData) {
                return next(ApiError.badRequest('User not found'))
            }
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 20 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController();
