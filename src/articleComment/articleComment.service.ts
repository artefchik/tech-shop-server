import {ObjectId} from 'mongodb';
import ArticleCommentsModel from './articleComment.model';
import ApiError from '../exceptions/ApiError';
import UserService from '../user/user.service';
import {ArticleCommentDto} from './articleComment.dto';
import {ArticleComment, CommentArg} from "./articleComment.interface";




class ArticleCommentsService {
    async getById(articleId: string) {
        const commentsData = await ArticleCommentsModel.find({
            articleId: new ObjectId(articleId),
        });

        if (!commentsData) {
            throw ApiError.badRequest('No comments found');
        }

        async function processCommentsWithUsers(commentsData: ArticleComment[]) {
            const commentsWithUsers = [];

            for (const comment of commentsData) {
                try {
                    // @ts-ignore
                    const user = await UserService.getOne(comment.userId);
                    const commentDto = new ArticleCommentDto(comment);
                    commentsWithUsers.push({...commentDto, user});
                } catch (error) {
                    console.error(`Error processing comment`);
                }
            }

            return commentsWithUsers;
        }

        return await processCommentsWithUsers(commentsData);
    }

    async createComment(commentData:CommentArg) {
        const {articleId, userId, text} = commentData;
        if (!articleId || !userId || !text) {
            throw ApiError.badRequest('Incorrect data');
        }
        const newComment = await ArticleCommentsModel.create({
            articleId: new ObjectId(articleId),
            userId: new ObjectId(userId),
            text,
        });
        const user = await UserService.getOne(new ObjectId(userId));
        const commentDto = new ArticleCommentDto(newComment);

        return {...commentDto, user};
    }

    async updateComment(commentData:CommentArg) {
        const {articleId, userId, text, id} = commentData;
        if (!articleId || !userId || !text) {
            throw ApiError.badRequest('Incorrect data');
        }
        const updatedComment = await ArticleCommentsModel.updateOne(
            {
                _id: new ObjectId(id),
            },
            {$set: {text}},
        );
        return updatedComment;
    }

    async deleteComment(id:string) {
        const deleteComment = await ArticleCommentsModel.findByIdAndDelete(id);
        return deleteComment;
    }
}

export default new ArticleCommentsService();
