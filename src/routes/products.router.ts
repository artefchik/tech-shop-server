import { Router } from 'express';
import ProductsController from '../product/product.controller'
// @ts-ignore
const router = new Router();
import { NextFunction, Response,Request } from 'express';

router.get('/', ProductsController.getAll);
router.get('/:id',ProductsController.getOne);

export default router
// (req:Request,res:Response)=>{
//     res.json(req.params)
// })
