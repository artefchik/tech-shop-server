import {Router} from 'express';
import BasketSController from '../basket/basket.controller';

// @ts-ignore
const router = new Router();

router.post('/:id', BasketSController.addProduct);
router.get('/:id', BasketSController.getProducts);
router.patch('/:id', BasketSController.updateProduct);
router.delete('/:id', BasketSController.deleteProduct);

export default router;
