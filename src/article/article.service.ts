import {ArticleModel} from './article.model';
import UserService from '../user/user.service';
import {ArticleDto} from './article.dto';
import {QueryParamsType} from '../types/request';
import {Article} from './article.interface';
import ApiError from "../exceptions/ApiError";
import {SortOrder} from "mongoose";


type SortField = "views"


interface QuerySort {
    [key: string]: SortOrder;
}

interface QueryFilters {
    [key: string]: string;
}

class ArticleService {
    async getAll(query: QueryParamsType) {

        const limit = query.limit ?? 2;
        const page = query.page ?? 1;
        const order = query.order ?? 'asc';
        const sort = query.sort ?? 'views';
        let articles;
        let queryFilter: QueryFilters = {};

        if (query.types) {
            // @ts-ignore
            queryFilter.types = {$elemMatch: {$eq: query.types}};
            // queryFilter.types = query.types
        }
        console.log(queryFilter,sort,order)
        let querySort: QuerySort = {};
        if (query.sort) {
            querySort[sort] = order;
        }
        console.log(querySort)

        articles = await ArticleModel.find(queryFilter)
            .sort(querySort)
            .skip(page * limit - limit)
            .limit(limit)

        async function processArticlesWithUsers(articles: Article[]) {
            const articlesWithUsers = [];

            for (const article of articles) {
                try {
                    const user = await UserService.getOne(article.userId);

                    const articleDto = new ArticleDto(article);

                    articlesWithUsers.push({...articleDto, user});
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
