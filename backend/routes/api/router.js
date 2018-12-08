import express from 'express';
const router = express.Router();

import authMiddleware from '../../middleware/auth';
import UserController from '../../controller/user.controller';
import PostController from '../../controller/post.controller';
import BlockController from '../../controller/block.controller';

// UserController function: test, signup, signin, profile
router.route('/user/test').get(UserController.test);
router.route('/user/signin').post(UserController.signin);
router.route('/user/signup').post(UserController.signup);
router.route('/user/profile').get(authMiddleware, UserController.profile);

router.route('/post/get').get(PostController.get);
router.route('/post/get/all').get(PostController.getAll);
router.route('/post/search').get(PostController.search);
router.route('/post/node').get(PostController.searchNoPaging);

router.route('/block/get').get(BlockController.get);
router.route('/block/get/page').get(BlockController.getPage);
router.route('/block/search').get(BlockController.search);

export default router;
