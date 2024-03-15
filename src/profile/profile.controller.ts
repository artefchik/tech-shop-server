import {RequestWithParams, RequestWithParamsAndBody} from '../types/request';

import ProfileService from './profile.service';
import {Profile} from './profile.interface';
import {NextFunction, Response} from 'express';
import {ProfileDtoType} from './profile.dto';
import ApiError from "../exceptions/ApiError";

class ProfileController {
    async getById(
        req: RequestWithParams<{ id: string }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const {id} = req.params;
            const profile = await ProfileService.getById(id);
            if (!profile) {
                return next(ApiError.badRequest('Profile not Found'));
            }
            res.json(profile);
        } catch (e) {
            return next(e);
        }
    }

    async updateProfile(
        req: RequestWithParamsAndBody<{ id: string }, Profile>,
        res: Response<ProfileDtoType>,
        next: NextFunction,
    ) {
        try {
            const {body} = req;
            const {id} = req.params;
            if (!body || !id) {
                return next(ApiError.badRequest('Incorrect data'));

            }
            const updateProfile = await ProfileService.updateProfile(body,id);
            if (!updateProfile){
                return next(ApiError.badRequest('Incorrect data'));
            }
            // @ts-ignore
            res.json(updateProfile);
        } catch (e) {
            next(e)
        }
    }
}

export default new ProfileController();
