/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import controller from '../controllers/games.controller';

const router = Router();

router.get('/', controller.getGames);

router.get('/top', controller.getTopGames);

router.get('/mechanics', controller.getMechanics);

router.get('/categories', controller.getCategories);

router.get('/search-suggestions', controller.getSearchSuggestions);

router.get('/:gameId', controller.getGame);

export default router;
