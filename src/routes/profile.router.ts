import {Router} from "express";
import ProfileController from "../profile/profile.controller";

// @ts-ignore
const router = new Router();


router.get('/:id',ProfileController.getById)
router.patch('/:id',ProfileController.updateProfile)

export default router
