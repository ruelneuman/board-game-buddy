import { Router } from 'express';
import controller from '../controllers/games.controller';
import { expressJwtAuth } from '../middleware/auth';

const router = Router();

router.get('/', controller.getGames);
router.post('/', expressJwtAuth, controller.createGame);

router.get('/:gameId', controller.getGame);

export default router;
