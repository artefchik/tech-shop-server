import { Router } from 'express';
import productsRouter from './products.router';
import { Request,Response } from 'express';

// @ts-ignore
const router = new Router();

router.use('/products', productsRouter);
router.get('/', ((req:Request, res:Response)=>{
    res.json('kkk')
}));

export default router
