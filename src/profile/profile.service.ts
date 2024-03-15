import {ObjectId} from 'mongodb';
import {ProfileModel} from './profile.model';
import UserService from '../user/user.service';
import {ProfileDto} from './profile.dto';
import {Profile} from './profile.interface';
import ApiError from "../exceptions/ApiError";

class ProfileService {
    async getById(userId: string) {
        const profile = await ProfileModel.findById<Profile>(userId);
        if (!profile) {
            throw ApiError.badRequest('Profile not found');
        }
        const profileDto = new ProfileDto(profile);
        const user = await UserService.getOne(profileDto.id);
        return {...profileDto, user: user};
    }

    async createProfile(id: ObjectId) {
        const profile = await ProfileModel.create({_id: new ObjectId(id)});
        return profile;
    }

    async updateProfile(data: Profile,id:string) {

        const updatedProfile = await ProfileModel.findOneAndUpdate<Profile>(
            {_id: new ObjectId(id,)},
            {$set: {...data}},
            {new: true},
        );
        if (!updatedProfile) {
            throw ApiError.badRequest('The data could not be updated .Try again please.');
        }
        const profileDto = new ProfileDto(updatedProfile);
        const user = await UserService.getOne(profileDto.id);
        return {...profileDto, user};
    }
}

export default new ProfileService();
