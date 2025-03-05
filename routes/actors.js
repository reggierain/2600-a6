import express from 'express';
const actorsRouter = express.Router();

import postActors from '../controllers/actorsControllers.js';
actorsRouter.post('/', postActors);

export default actorsRouter;