import express from 'express';
const showsRouter = express.Router();

import {postShows, getShows} from '../controllers/showsControllers.js';

showsRouter.post('/', postShows);
showsRouter.get('/', getShows);

export default showsRouter;