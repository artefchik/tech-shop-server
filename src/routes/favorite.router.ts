import {Router} from 'express';
import FavoriteSController from '../favorite/favorite.controller';

// @ts-ignore
const router = new Router();

router.post('/:id', FavoriteSController.toggleFavorite);
router.get('/:id', FavoriteSController.getFavorites);

export default router;
