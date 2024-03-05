import { Router } from 'express';
import productsRouter from './products.router';
import userRouter from './user.router';
import basketRouter from './basket.router';
import { Request,Response } from 'express';

// @ts-ignore
const router = new Router();

router.use('/products', productsRouter);
router.use('/basket', basketRouter);
router.use('/', userRouter);



export default router
