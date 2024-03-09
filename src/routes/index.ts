import { Router } from 'express';
import productsRouter from './products.router';
import userRouter from './user.router';
import basketRouter from './basket.router';
import articleRouter from './article.router';
import favoriteRouter from './favorite.router';
import { Request,Response } from 'express';

// @ts-ignore
const router = new Router();

router.use('/', userRouter);
router.use('/products', productsRouter);
router.use('/basket', basketRouter);
router.use('/articles', articleRouter);
router.use('/favorites', favoriteRouter);



export default router
