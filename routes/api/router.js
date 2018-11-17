import express from 'express';
const router = express.Router();

import authMiddleware from '../../middleware/auth';
import UserController from '../../controller/user.controller';
import malwareController from '../../controller/malware.controller';
import blockController from '../../controller/block.controller';

// UserController function: test, signup, signin, profile
router.route('/user/test').get(UserController.test);
router.route('/user/signin').post(UserController.signin);
router.route('/user/signup').post(UserController.signup);
router.route('/user/profile').get(authMiddleware, UserController.profile);

router.route('/malware/get').get(malwareController.get);
router.route('/malware/search').get(malwareController.search);
router.route('/malware/getData').get(malwareController.getAutoComplete);

router.route('/block/get').get(blockController.get);
router.route('/block/search').get(blockController.search);

export default router;