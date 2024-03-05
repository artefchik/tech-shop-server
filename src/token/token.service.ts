import jwt from 'jsonwebtoken';
import { TokenModel } from './token.model';
import { Token } from './token.interface';
import { User } from '../user/user.interface';

const JWT_REFRESH_KEY = 'JWT_REFRESH_KEY';
const JWT_ACCESS_KEY = 'JWT_ACCESS_KEY';

interface TokensGenerate {
    accessToken: string;
    refreshToken: string;
}
class TokenService {
    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_KEY, {
            expiresIn: '15m',
        });
        const refreshToken = jwt.sign(payload, JWT_REFRESH_KEY, {
            expiresIn: '1h',
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(data: Token) {
        const { userId, refreshToken } = data;
        const tokenData = await TokenModel.findOne<Token>({ userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await TokenModel.create({
            userId,
            refreshToken,
        });
        return token;
    }

    async removeToken(refreshToken: string) {
        const tokenData = await TokenModel.deleteOne({ refreshToken });
        return;
    }

    async findToken(refreshToken: string) {
        const tokenData = await TokenModel.findOne<Token>({ refreshToken });
        return tokenData;
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, JWT_ACCESS_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, JWT_REFRESH_KEY);
            return userData ;
        } catch (e) {
            return null;
        }
    }
}

export default new TokenService();
