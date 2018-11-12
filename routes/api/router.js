import express from 'express';
const router = express.Router();

import authMiddleware from '../../middleware/auth';
import UserController from '../../controller/user.controller';

// UserController function: test, signup, signin, profile
router.route('/user/test').get(UserController.test);
router.route('/user/signin').post(UserController.signin);
router.route('/user/signup').post(UserController.signup);
router.route('/user/profile').get(authMiddleware, UserController.profile);

export default router;