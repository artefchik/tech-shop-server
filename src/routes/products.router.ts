import { Router } from 'express';
import ProductsController from '../product/product.controller'
// @ts-ignore
const router = new Router();

router.get('/', ProductsController.getAll);
router.get('/:id',ProductsController.getOne);

export default router
