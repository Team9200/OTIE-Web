import express from 'express';
const router = express.Router();

import apiRouter from './api/router';

router.use('/api', apiRouter);

export default router;