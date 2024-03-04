import { Router } from 'express';
import ProductsController from '../products/product.controller'
// @ts-ignore
const router = new Router();

router.get('', ProductsController.getAll);

export default router
