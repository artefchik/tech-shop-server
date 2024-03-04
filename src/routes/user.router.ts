import {Router} from 'express';
import {body} from 'express-validator';
import UserController from '../user/user.controller';

// @ts-ignore
const router = new Router();

router.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 32}),
    UserController.registration,
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);

export default router;
