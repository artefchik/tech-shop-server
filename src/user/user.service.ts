import bcrypt from 'bcrypt';
import {UserModel} from './user.model';
import {UserDto} from './user.dto';
import {Types} from 'mongoose';
import TokenService from '../token/token.service';
import {User} from './user.interface';
import {Token} from '../token/token.interface';
import ProfileService from '../profile/profile.service';
import BasketService from '../basket/basket.service';
import FavoriteService from "../favorite/favorite.service";
import ApiError from "../exceptions/ApiError";
import uuid from 'uuid'

interface UserRegistration {
    email: string;
    password: string;
    username: string;
}

class UserService {
    getDto(user: User) {
        return new UserDto(user);
    }

    async registration(userData: UserRegistration) {
        const {email, username, password} = userData;
        const userFromDb = await UserModel.findOne<User>({email});
        if (userFromDb) {
            throw ApiError.badRequest(`The user with email ${userFromDb.email} already exists`)
        }
        const userWithName = await UserModel.findOne<User>({username});
        if (userWithName) {
            throw ApiError.badRequest(`The user with email ${userWithName.email} already exists`)
        }
        const hasPassword = await bcrypt.hash(password, 4);
        const activatedLinkEmail = hasPassword;
        const user = await UserModel.create({
            email,
            username,
            password: hasPassword,
            activatedLinkEmail,
        });
        const userDto = this.getDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken({
            userId: userDto.id,
            refreshToken: tokens.refreshToken,
        } as Token);

        await ProfileService.createProfile(userDto.id);
        await BasketService.createBasket(userDto.id);
        await FavoriteService.createFavoriteStorage(userDto.id);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async login(email: string, password: string) {
        const user = await UserModel.findOne<User>({email});
        if (!user) {
            throw ApiError.badRequest('User not found')
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if (!isPasswordEquals) {
            throw ApiError.badRequest('Passwords don\'t match')
        }

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken({
            userId: userDto.id,
            refreshToken: tokens.refreshToken,
        } as Token);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async logout(refreshToken: string) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken: string) {
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenInDb = await TokenService.findToken(refreshToken);
        if (!userData || !tokenInDb) {
            throw ApiError.badRequest('User not found')
        }
        //@ts-ignore
        const user = await UserModel.findById<User>(userData.id);
        if (!user) {
            throw ApiError.badRequest(`User not found`)
        }
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken({
            userId: userDto.id,
            refreshToken: tokens.refreshToken,
        } as Token);
        if (tokens && userDto) {
            return {
                ...tokens,
                user: userDto,
            };
        }
    }

    async getOne(id: Types.ObjectId) {
        const user = await UserModel.findById<User>(id);
        if (!user) {
            throw ApiError.badRequest('User not found')
        }
        return new UserDto(user);
    }

}

export default new UserService();
