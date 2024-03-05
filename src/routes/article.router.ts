import { Router } from 'express';
import ArticlesController from '../article/article.controller';
import ArticlesCommentsController from '../articleComment/articleComment.controller';

// @ts-ignore
const articlesRouter = new Router();

articlesRouter.get('/', ArticlesController.getAll);
articlesRouter.get('/:id', ArticlesController.getById);
articlesRouter.post('/comments/:id', ArticlesCommentsController.createComment);
articlesRouter.get('/comments/:id', ArticlesCommentsController.getById);
articlesRouter.delete('/comments/:id', ArticlesCommentsController.deleteComment);
articlesRouter.patch('/comments/:id', ArticlesCommentsController.updateComment);
// articlesRouter.post('/rating/:id', ArticlesRatingController.addRating);

export default articlesRouter;
