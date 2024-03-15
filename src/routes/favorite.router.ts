import {Router} from 'express';
import FavoriteSController from '../favorite/favorite.controller';
import {authMiddleware} from "../middleware/auth.middleware";

// @ts-ignore
const router = new Router();

router.post('/:id', FavoriteSController.toggleFavorite);
router.get('/init/:id', FavoriteSController.getFavoriteStorage);
router.get('/:id', FavoriteSController.getFavorites);

export default router;
