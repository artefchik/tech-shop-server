import { Router } from 'express';
import productsRouter from './products.router';
import userRouter from './user.router';
import basketRouter from './basket.router';
import articleRouter from './article.router';
import favoriteRouter from './favorite.router';
import profileRouter from './profile.router';
import { Request,Response } from 'express';
import {authMiddleware} from "../middleware/auth.middleware";

// @ts-ignore
const router = new Router();

router.use('/', userRouter);
router.use('/products', productsRouter);
router.use('/profile', profileRouter);
router.use('/basket',authMiddleware, basketRouter);
router.use('/articles', articleRouter);
router.use('/favorites',authMiddleware, favoriteRouter);



export default router
