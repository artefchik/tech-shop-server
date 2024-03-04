import { RequestWithParams, RequestWithParamsAndBody } from '../types/request';

import ProfileService from './profile.service';
import { Profile } from './profile.interface';
import { NextFunction, Response } from 'express';
import { ProfileDtoType } from './profile.dto';
import ApiError from "../exceptions/ApiError";

class ProfileController {
    async getById(
        req: RequestWithParams<{ id: string }>,
        res: Response<ProfileDtoType>,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            if (!id) {
                return next( ApiError.Unauthorized());


            }
            const profile = await ProfileService.getById(id);
            if (!profile) {
                return next( ApiError.Unauthorized());

            }
            // @ts-ignore
            res.json(profile);
        } catch (e) {
            return next( ApiError.Unauthorized());


        }
    }

    async updateProfile(
        req: RequestWithParamsAndBody<{ id: string }, Profile>,
        res: Response<ProfileDtoType>,
        next: NextFunction,
    ) {
        try {
            const { body } = req;
            const { id } = req.params;
            if (!body || !id) {
                return next( ApiError.Unauthorized());

            }
            const updateProfile = await ProfileService.updateProfile(body);
            if (!updateProfile) {
                return next( ApiError.Unauthorized());

            }
            // @ts-ignore
            res.json(updateProfile);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new ProfileController();
