import express from 'express';
const router = express.Router();

import authMiddleware from '../../middleware/auth';
import UserController from '../../controller/user.controller';
import PostController from '../../controller/post.controller';
import BlockController from '../../controller/block.controller';
import VoteController from '../../controller/vote.controller';

// UserController function: test, signup, signin, profile
router.route('/user/test').get(UserController.test);
router.route('/user/signin').post(UserController.signin);
router.route('/user/signup').post(UserController.signup);
router.route('/user/profile').get(authMiddleware, UserController.profile);
router.route('/user/get').get(UserController.getUser);
router.route('/user/search').get(UserController.searchUser);

router.route('/post/view').get(PostController.view);
router.route('/post/get').get(PostController.get);
router.route('/post/get/malware').get(PostController.getMalware);
router.route('/post/get/all').get(PostController.getAll);
router.route('/post/search').get(PostController.search);
router.route('/post/searchTest').get(PostController.searchTest);
router.route('/post/node').get(PostController.searchNoPaging);
router.route('/post/get/body').get(PostController.getBody);
router.route('/post/count').get(PostController.count);
router.route('/post/popular').get(PostController.getPop);

router.route('/block/get').get(BlockController.get);
router.route('/block/get/page').get(BlockController.getPage);
router.route('/block/count').get(BlockController.count);

router.route('/vote/user').get(VoteController.userVote);

export default router;
