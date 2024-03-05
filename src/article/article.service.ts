import mongoose from 'mongoose';
import { ArticleModel } from './article.model';
import UserService from '../user/user.service';
import { ArticleDto } from './article.dto';
import { UserDto } from '../user/user.dto';
import { QueryParamsType } from '../types/request';
import { Article } from './article.interface';
import ApiError from "../exceptions/ApiError";

class ArticleService {
    async getAll(query: QueryParamsType) {
        const limit = query.limit ?? 2;
        const page = query.page ?? 1;
        const order = query.order ?? 'asc';
        const sort = query.sort ?? 'views';
        let articles;
        if (!query.category) {
            articles = await ArticleModel.find()
                .skip(page * limit - limit)
                .limit(limit)
                .sort({ [sort]: order });
        } else {
            articles = await ArticleModel.find({
                types: { $elemMatch: { $eq: query.category } },
            })
                .skip(page * limit - limit)
                .limit(limit)
                .sort({ [sort]: order });
        }

        async function processArticlesWithUsers(articles: Article[]) {
            const articlesWithUsers = [];

            for (const article of articles) {
                try {
                    const user = await UserService.getOne(article.userId);

                    const articleDto = new ArticleDto(article);

                    articlesWithUsers.push({ ...articleDto, user });
                } catch (error) {
                    console.error(`Error processing comment: ${error}`);
                }
            }

            return articlesWithUsers;
        }

        return processArticlesWithUsers(articles);
    }

    async getById(id: string) {
        const article = await ArticleModel.findById(id);
        if (!article) {
           throw ApiError.badRequest('Article not found')
        }
        const user = await UserService.getOne(article.userId);
        const articleDto = new ArticleDto(article);
        return {
            ...articleDto,
            user,
        };
    }
}
export default new ArticleService();
