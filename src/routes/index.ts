import { Router } from 'express';
import productsRouter from './products.router';
import userRouter from './user.router';
import { Request,Response } from 'express';

// @ts-ignore
const router = new Router();

router.use('/product', productsRouter);
router.use('/', userRouter);



export default router
