import express from 'express';
const router = express.Router();

import actorsRouter from './actors.js';
import showsRouter from './shows.js';

router.use('/actors', actorsRouter);
router.use('/shows', showsRouter);

export default router;