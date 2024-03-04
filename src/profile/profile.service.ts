import { ObjectId } from 'mongodb';
import { ProfileModel } from './profile.model';
import UserService from '../user/user.service';
import { ProfileDto } from './profile.dto';
import { Profile } from './profile.interface';
import ApiError from "../exceptions/ApiError";

class ProfileService {
    async getById(userId: string) {
        const profile = await ProfileModel.findById<Profile>(userId);
        if (!profile) {
            return  ApiError.BadRequest('ошибка валидации');
        }
        const profileDto = new ProfileDto(profile);
        const user = await UserService.getOne(profileDto.id);
        return { ...profileDto, user: user };
    }

    async createProfile(id: ObjectId) {
        const profile = await ProfileModel.create({ _id: new ObjectId(id) });
        return profile;
    }

    async updateProfile(data: Profile) {
        const updatedProfile = await ProfileModel.findByIdAndUpdate<Profile>(
            data._id,
            { $set: { ...data } },
            { new: true },
        );
        if (!updatedProfile) {
            return;
        }
        const profileDto = new ProfileDto(updatedProfile);
        const user = await UserService.getOne(profileDto.id);
        return { ...profileDto, user };
    }
}

export default new ProfileService();
